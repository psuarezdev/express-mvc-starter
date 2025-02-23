import { Expose } from 'class-transformer';
import { IsEmail, Length, Matches } from 'class-validator';

export class CreateUserRequest {
  @Expose()
  @Length(3, 50, { message: 'First name must be between 3 and 50 characters' })
  firstName!: string;

  @Expose()
  @Length(3, 50, { message: 'Last name must be between 3 and 50 characters' })
  lastName!: string;

  @Expose()
  @IsEmail({}, { message: 'A valid email address is required' })
  email!: string;

  @Expose()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least one letter, one number, and should be at least 8 characters long'
  })
  password!: string;
}
