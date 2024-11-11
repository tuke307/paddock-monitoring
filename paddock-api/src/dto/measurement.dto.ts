import { IsDateString, IsNumber } from 'class-validator';

export class CreateMeasurementDto {
  @IsNumber()
  value: number;

  @IsDateString({ strict: true, strictSeparator: true })
  timestamp: Date;

  @IsNumber()
  sensorId: number;
}
