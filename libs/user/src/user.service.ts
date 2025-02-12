import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserPayloadDTO } from './dto/create-user.dto';
import { UpdateUserPayloadDTO } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(payload: CreateUserPayloadDTO): Promise<UserDTO | null> {
    const queryRunner = this.userRepo.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const user = this.userRepo.create(payload);
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      if (!user) {
        return null;
      }

      return user;
    } catch {
      await queryRunner.rollbackTransaction();
      return null;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(filters?: { role?: string }): Promise<UserDTO[]> {
    const queryBuilder = this.userRepo.createQueryBuilder('user');

    if (filters?.role !== undefined) {
      queryBuilder.andWhere('user.role = :role', {
        role: String(filters.role),
      });
    }

    return queryBuilder.getMany();
  }

  async updateUser(
    id: number,
    payload: UpdateUserPayloadDTO,
  ): Promise<UserDTO | null> {
    const user = await this.findOneById(id);
    if (user === null) {
      return null;
    }
    Object.assign(user, payload);
    await this.userRepo.save(user);
    return user;
  }

  async deleteUser(id: number): Promise<UserDTO | null> {
    const queryRunner = this.userRepo.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const user = await this.findOneById(id);
      if (user === null) {
        return null;
      }
      await queryRunner.manager.remove(User, user);
      await queryRunner.commitTransaction();
      return user;
    } catch {
      await queryRunner.rollbackTransaction();
      return null;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteAllUsers(): Promise<void | null> {
    const queryRunner = this.userRepo.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.clear(User);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
      return null;
    } finally {
      await queryRunner.release();
    }
  }

  async findOneById(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (user === null) {
      return null;
    }
    return user;
  }
}
