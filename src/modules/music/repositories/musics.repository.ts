import { CreateMusicDto } from '../dto/create-music.dto';
import { FiltersMusicDto } from '../dto/filter-music.dto';
import { MusicPagination } from '../dto/pagination-music.dto';
import { UpdateMusicDto } from '../dto/update-music.dto';
import { Music } from '../entities/music.entity';

export abstract class MusicRepository {
  abstract create(data: CreateMusicDto, userId: string): Promise<Music>;

  abstract findAll(
    group: string | undefined,
    genre: string | undefined,
  ): Promise<Music[] | object>;

  abstract findByQuery(
    page: string,
    limit: string,
    filters?: FiltersMusicDto,
  ): Promise<MusicPagination>;

  abstract findOne(id: string): Promise<Music> | undefined;

  abstract update(data: UpdateMusicDto, id: string): Promise<Music>;

  abstract delete(id: string): Promise<void> | void;
}
