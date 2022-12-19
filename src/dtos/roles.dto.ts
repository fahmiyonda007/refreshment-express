import { IsString } from 'class-validator'
import { Trim } from 'class-sanitizer'

export class CreateDto {
  @IsString()
  @Trim()
  name: string
}

export class UpdateDto {
  @IsString()
  @Trim()
  name: string
}

export class DeleteDto {
  @IsString()
  @Trim()
  id: string
}
