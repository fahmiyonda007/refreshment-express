import { IsString } from 'class-validator'
import { Trim } from 'class-sanitizer'

export class CreateDto {
  @IsString()
  role: string

  @IsString()
  user: string
}

export class UpdateDto {
  @IsString()
  role: string

  @IsString()
  user: string
}

export class DeleteDto {
  @IsString()
  role: string

  @IsString()
  user: string
}
