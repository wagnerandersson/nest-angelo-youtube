import { InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class UpdateClientInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty({ message: 'Invalid E-mail' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password too short: minimum 6 characteres.' })
  @MaxLength(10, { message: 'Password too long: maximum 10 characteres. ' })
  @IsNotEmpty({ message: 'Please create a new password' })
  pass?: string;
}
