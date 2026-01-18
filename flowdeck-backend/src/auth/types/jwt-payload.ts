import { Role } from '../enums/role.enums';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}
