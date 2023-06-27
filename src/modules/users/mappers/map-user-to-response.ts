import { UserResponseDto } from '@modules/users/dtos/user-response.dto';
import { User } from '@modules/users/entities/user.entity';

export const mapUserToResponseDto = (user: User): UserResponseDto => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
