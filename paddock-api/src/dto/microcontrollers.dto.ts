import { IsMACAddress, IsOptional, IsString } from 'class-validator';

export class CreateMicrocontrollerDto {
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
}
