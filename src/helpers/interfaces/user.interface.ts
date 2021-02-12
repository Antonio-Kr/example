import { Roles } from 'src/helpers/entities/roles.entity';
export interface IUser {
  role: Roles[] | number;
  email: string;
  id: number;
}
