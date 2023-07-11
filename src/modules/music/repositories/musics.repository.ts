import { CreateMusicDto } from '../dto/create-music.dto';
import { UpdateMusicDto } from '../dto/update-music.dto';
import { Music } from '../entities/music.entity';

export abstract class MusicRepository {
  abstract create(data: CreateMusicDto): Promise<Music>;
  abstract findAll(group: string | undefined): Promise<Music[] | object>;

  abstract findOne(id: string): Promise<Music> | undefined;

  abstract update(data: UpdateMusicDto, id: string): Promise<Music> | Music;

  abstract delete(id: string): Promise<void> | void;
}
