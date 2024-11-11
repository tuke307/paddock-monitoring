import { IsOptional, IsString, IsEnum } from 'class-validator';
import { SensorType } from '@prisma/client';

export class CreateSensorDto {
  @IsString()
  name: string;

  @IsEnum(SensorType)
  type: SensorType;

  @IsOptional()
  @IsString()
  location?: string;
}
