import { IsOptional, IsString } from 'class-validator';

export class FiltersMusicDto {
  @IsString()
  @IsOptional()
  genre: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  album: string;

  @IsString()
  @IsOptional()
  artist: string;

  @IsString()
  @IsOptional()
  year: string;
}
