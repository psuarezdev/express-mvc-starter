import { hash } from 'bcrypt';
import { AppDataSource } from '@/lib/database';
import { User } from '@/models/user.entity';
import { CreateUserRequest } from '@/requests/user/create-user.request';
import { UpdateUserRequest } from '@/requests/user/update-user.request';
import { UtilsService } from './utils.service';
import { UserDTO } from '@/models/dto/user.dto';

export class UserService {
  readonly #userRepository = AppDataSource.getRepository(User);

  constructor(private readonly utilsService: UtilsService) {}

  async findById(id: number) {
    try {
      const user = await this.#userRepository.findOneBy({ id });
      return (await this.utilsService.mapToDto(user, UserDTO)).dto;
    } catch (error) {
      return null;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.#userRepository.findOneBy({ email });
    } catch (error) {
      return null;
    }
  }

  async create(data: CreateUserRequest) {
    try {
      const emailExists = await this.#userRepository.findOneBy({ email: data.email });

      if(emailExists) {
        throw new Error('Email already exists');
      }

      const user = await this.#userRepository.save({
        ...data,
        password: await hash(data.password, 10)
      }) as User;

      return (await this.utilsService.mapToDto(user, UserDTO)).dto;
    } catch (error) {
      return null;
    }
  }

  async update(id: number, data: UpdateUserRequest) {
    try {
      if(id <= 0) {
        throw new Error('Id must be greater than 0');
      }

      const userFound = await this.#userRepository.findOneBy({ id });

      if(!userFound) {
        throw new Error('User does not exists');
      }

      const user = await this.#userRepository.save({
        id,
        firstName: data.firstName ?? userFound.firstName,
        lastName: data.lastName ?? userFound.lastName,
        email: data.email ?? userFound.email
      }) as User;

      return (await this.utilsService.mapToDto(user, UserDTO)).dto;
    } catch (error) {
      return null;
    }
  }

  async deleteById(id: number) {
    try {
      const result = await this.#userRepository.delete({ id });
      return result.affected === 1;
    } catch (error) {
      return false;
    }
  }
}
