import { IUserSeeder } from './../../helpers/interfaces/user-seeder.interface';

export const users: IUserSeeder[] = [
  { email: 'admin@admin.com', password: '123', role: 1 },
  { email: 'test@test.com', password: '123', role: 2 },
];
