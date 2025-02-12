// import { Role } from '../enums/role.enum';

export interface ICreateUserPayload {
  full_name: string;
  // role: Role;
  role: string;
  efficiency: number;
}

export interface IUser {
  id: number;
  full_name: string;
  // role: Role;
  role: string;
  efficiency: number;
}

export type IUserIdResponse = Pick<IUser, 'id'>;

export interface IUpdateUserPayload {
  full_name?: string;
  // role?: Role;
  role?: string;
  efficiency?: number;
}

export interface IGetAllUsersQuery {
  // role: Role;
  role?: string;
}
