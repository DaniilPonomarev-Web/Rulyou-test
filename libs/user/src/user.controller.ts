import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IUserIdResponse } from './types/user.types';
import { UserService } from './user.service';
import { ApiResponse } from '@app/shared';
import { CreateUserPayloadDTO } from './dto/create-user.dto';
import { UpdateUserPayloadDTO } from './dto/update-user.dto';
import { GetAllUsersQueryDTO, IdParamDTO, UserDTO } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(
    @Body(new ValidationPipe()) payload: CreateUserPayloadDTO,
  ): Promise<IUserIdResponse> {
    const newUser = await this.userService.createUser(payload);
    if (!newUser) {
      throw new BadRequestException('Ошибка создания пользователя');
    }
    return { id: newUser.id };
  }

  @Get('get')
  async getAllUsers(@Query() query: GetAllUsersQueryDTO): Promise<UserDTO[]> {
    return this.userService.findAll(query);
  }

  @Get('get/:id')
  async getUserById(@Param() { id }: IdParamDTO): Promise<UserDTO> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`Пользователь с id ${id} не найден`);
    }
    return user;
  }

  @Patch('update/:id')
  async updateUser(
    @Param() { id }: IdParamDTO,
    @Body(new ValidationPipe()) payload: UpdateUserPayloadDTO,
  ): Promise<UserDTO> {
    const updatedUser = await this.userService.updateUser(id, payload);
    if (!updatedUser) {
      throw new BadRequestException('Ошибка при обновлении пользователя');
    }
    return updatedUser;
  }

  @Delete('delete/:id')
  async deleteUserById(
    @Param() { id }: IdParamDTO,
  ): Promise<ApiResponse<UserDTO>> {
    const deletedUser = await this.userService.deleteUser(id);
    if (deletedUser === null) {
      return {
        success: false,
        result: { error: `Ошибка удаления пользователя` },
      };
    }
    return {
      success: true,
      result: {
        id: id,
        full_name: deletedUser.full_name,
        role: deletedUser.role,
        efficiency: deletedUser.efficiency,
      },
    };
  }

  @Delete('delete')
  async deleteAllUsers(): Promise<ApiResponse<null>> {
    const deletedUsers = await this.userService.deleteAllUsers();
    if (deletedUsers === null) {
      return {
        success: false,
        result: { error: `Ошибка удаления всех пользователей` },
      };
    }
    return { success: true };
  }
}
