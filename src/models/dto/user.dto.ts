import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserDTO {
  @Expose()
  @IsNotEmpty({ message: 'Id is required' })
  id!: number;

  @Expose()
  @Length(3, 50, { message: 'First name must be between 3 and 50 characters' })
  firstName!: string;

  @Expose()
  @Length(3, 50, { message: 'Last name must be between 3 and 50 characters' })
  lastName!: string;

  @Expose()
  @IsEmail({}, { message: 'A valid email address is required' })
  email!: string;

  @Exclude()
  password!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
