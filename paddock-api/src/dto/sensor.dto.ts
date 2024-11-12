import { IsOptional, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { SensorType } from '@prisma/client';

export class CreateSensorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(SensorType)
  type: SensorType;

  @IsOptional()
  @IsString()
  location?: string;
}
