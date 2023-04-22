import { IsEmail, IsNotEmpty, Length, IsString } from 'class-validator';
import { Match } from '../../utils/match.decorator';
export class RegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 40)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(5, 40)
  @IsString()
  password: string;

  @IsNotEmpty()
  @Length(5, 40)
  @IsString()
  @Match('password')
  passwordRepeat: string;
}
