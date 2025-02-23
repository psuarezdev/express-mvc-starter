import { compare } from 'bcrypt';
import { UtilsService } from '@/services/utils.service';
import { UserService } from '@/services/user.service';
import { LoginRequest } from '@/requests/auth/login.request';
import { RegisterRequest } from '@/requests/auth/register.request';
import { UserDTO } from '@/models/dto/user.dto';

export class AuthService {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly userService: UserService
  ) { }

  async login(data: LoginRequest) {
    try {
      const user = await this.userService.findByEmail(data.email);

      if (!user) {
        throw new Error('Wrong creadentials');
      }

      const passwordMatch = await compare(data.password, user.password);

      if (!passwordMatch) {
        throw new Error('Wrong creadentials');
      }

      return (await this.utilsService.mapToDto(user, UserDTO)).dto;
    } catch (error) {
      return null;
    }
  }

  async register(data: RegisterRequest) {
    try {
      return await this.userService.create(data);
    } catch (error) {
      return null;
    }
  }
}
