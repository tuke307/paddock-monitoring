import { IsMACAddress, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMicrocontrollerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  manufacturer?: string;

  @IsOptional()
  @IsString()
  masterChip?: string;

  @IsOptional()
  @IsString()
  loraChip?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  serialNumber?: string;

  @IsOptional()
  @IsMACAddress()
  macAddress?: string;

  @IsOptional()
  @IsNumber()
  paddockId: number;
}
