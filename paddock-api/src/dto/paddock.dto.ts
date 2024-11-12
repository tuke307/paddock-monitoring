import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreatePaddockDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  shape?: string;
}
