import { IsString } from 'class-validator'

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
