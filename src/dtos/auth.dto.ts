import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator'
import { Trim } from 'class-sanitizer'
import { Match } from '../utils/decorators/match.decorator'

export class UserSignUpDto {
  @IsString()
  @Trim()
  name: string

  @IsEmail()
  @Trim()
  email: string

  @IsString()
  @MinLength(8, { message: 'Password should be minimum of 8 characters' })
  @MaxLength(20, { message: 'Password should be maximum of 20 characters' })
  password: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('password', { message: "Passwword not match" })
  passwordConfirm?: string
}

export class UserSignInDto {
  @IsEmail()
  @Trim()
  email: string

  @IsString()
  @MinLength(8, { message: 'Password should be minimum of 8 characters' })
  @MaxLength(20, { message: 'Password should be maximum of 20 characters' })
  password: string
}
