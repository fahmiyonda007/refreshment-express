import {
  IsString,
  IsDateString,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator'
import { Trim } from 'class-sanitizer'

export class CreateTodoDto {
  @IsString()
  @Trim()
  title: string

  @IsString()
  @MaxLength(250)
  @Trim()
  description: string

  @IsDateString()
  @Trim()
  deadline: Date

  @IsBoolean()
  @IsOptional()
  isDone?: boolean

  @IsString()
  @IsOptional()
  @Trim()
  image?: string
}

export class UpdateTodoDto {
  @IsString()
  @Trim()
  title?: string

  @IsString()
  @MaxLength(250)
  @Trim()
  description?: string

  @IsDateString()
  @Trim()
  deadline?: Date

  @IsBoolean()
  @IsOptional()
  isDone?: boolean

  @IsString()
  @IsOptional()
  @Trim()
  image?: string
}
