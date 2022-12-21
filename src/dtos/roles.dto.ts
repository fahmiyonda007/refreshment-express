import { IsString } from 'class-validator'
import { Trim } from 'class-sanitizer'

export class CreateDto {
  @IsString()
  @Trim()
  name: string
}

export class UpdateDto {
  @IsString()
  id: string

  @IsString()
  @Trim()
  name: string
}
