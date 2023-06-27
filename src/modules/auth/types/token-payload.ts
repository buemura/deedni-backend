import { ROLES } from '@shared/enums/roles';

export interface TokenPayload {
  sub: string;
  role: ROLES;
}
