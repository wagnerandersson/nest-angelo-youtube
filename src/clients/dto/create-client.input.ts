import { InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateClientInput {
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  phone: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Invalid E-mail' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password too short: minimum 6 characteres.' })
  @MaxLength(10, { message: 'Password too long: maximum 10 characteres. ' })
  @IsNotEmpty({ message: 'Please create a password' })
  pass: string;
}
