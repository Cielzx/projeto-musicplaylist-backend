import { IsDate, IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  music_name: string;

  @IsString()
  artist: string;

  played_at: Date;
}
