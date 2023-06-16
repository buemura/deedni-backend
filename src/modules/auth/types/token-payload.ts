import { ROLES } from '@enums/roles';

export interface TokenPayload {
  sub: string;
  role: ROLES;
}
