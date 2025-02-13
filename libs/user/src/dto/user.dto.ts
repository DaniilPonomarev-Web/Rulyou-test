import {
  IsOptional,
  // IsEnum,
  IsString,
  IsInt,
  Min,
  IsNotEmpty,
} from 'class-validator';
// import { Role } from '../enums/role.enum';
import { IGetAllUsersQuery, IUser } from '../types/user.types';
import { Transform } from 'class-transformer';

export class UserDTO implements IUser {
  id: number;
  full_name: string;
  // role: Role;
  role: string;
  efficiency: number;
}

export class GetAllUsersQueryDTO implements IGetAllUsersQuery {
  // @IsEnum(Role, {
  //   message: () =>
  //     `Поле "role" должно быть из списка значений: ${Object.values(Role).join(', ')}`,
  // })
  // role?: Role;
  @IsOptional()
  @IsNotEmpty({ message: 'Поле "role" не может быть пустым' })
  @IsString({ message: 'Поле "role" должно быть строкой' })
  role?: string;
}

export class IdParamDTO {
  @Transform(({ value }) => Number(value)) // Приводим к числу
  @IsInt({ message: 'Параметр "id" должен быть числом.' })
  @Min(1, { message: 'Параметр "id" должен быть положительным числом.' })
  id: number;
}
