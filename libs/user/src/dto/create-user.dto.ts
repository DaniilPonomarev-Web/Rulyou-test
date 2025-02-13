import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsEnum,
  MaxLength,
} from 'class-validator';
import { ICreateUserPayload } from '../types/user.types';
// import { Role } from '../enums/role.enum';

export class CreateUserPayloadDTO implements ICreateUserPayload {
  @IsString({ message: 'Поле "full_name" должно быть строкой' })
  @IsNotEmpty({ message: 'Поле "full_name" не может быть пустым' })
  @MaxLength(200, {
    message: 'Поле "full_name" не может быть длиннее 200 символов',
  })
  full_name: string;

  // @IsNotEmpty({role})
  // @IsEnum(Role, {
  //   message: () =>
  //     `Поле "role" должно быть из списка: ${Object.values(Role).join(', ')}`,
  // })
  // role: Role;
  @IsNotEmpty({ message: 'Поле "role" не может быть пустым' })
  @IsString({ message: 'Поле "role" должно быть строкой' })
  @MaxLength(100, { message: 'Поле "role" не может быть длиннее 100 символов' })
  role: string;

  @IsInt({ message: 'Поле "efficiency" должно быть числом' })
  @Min(0, { message: 'Значение "efficiency" не может быть меньше 0' })
  @Max(100, { message: 'Значение "efficiency" не может быть больше 100' })
  efficiency: number;
}
