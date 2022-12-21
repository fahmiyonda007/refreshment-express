import { IsString } from 'class-validator'

export class CreateDto {
  @IsString()
  role: string

  @IsString()
  permission: string
}

export class UpdateDto {
  @IsString()
  role: string

  @IsString()
  permission: string
}
