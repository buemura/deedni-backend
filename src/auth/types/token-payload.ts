import { ROLES } from '../../common/enums/roles';

export interface TokenPayload {
  sub: string;
  role: ROLES;
}
