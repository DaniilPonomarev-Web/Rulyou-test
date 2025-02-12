import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';
import { IUpdateUserPayload } from '../types/user.types';
// import { Role } from '../enums/role.enum';

export class UpdateUserPayloadDTO implements IUpdateUserPayload {
  @IsString({ message: 'Поле "full_name" должно быть строкой' })
  @IsOptional()
  full_name?: string;

  // @IsOptional()
  // @IsEnum(Role, {
  //   message: () =>
  //     `Поле "role" должно быть из списка: ${Object.values(Role).join(', ')}`,
  // })
  // role?: Role;
  @IsNotEmpty({ message: 'Поле "role" не может быть пустым' })
  @IsString({ message: 'Поле "role" должно быть строкой' })
  role: string;

  @IsOptional()
  @IsInt({ message: 'Поле "efficiency" должно быть числом' })
  @Min(0, { message: 'Значение "efficiency" не может быть меньше 0' })
  @Max(100, { message: 'Значение "efficiency" не может быть больше 100' })
  efficiency?: number;
}
