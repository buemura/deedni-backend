import { UserResponseDto } from '../dtos/user-response.dto';
import { User } from '../entities/user.entity';

export const mapUserToResponseDto = (user: User): UserResponseDto => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
