import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from '../../dto/create-music.dto';
import { UpdateMusicDto } from '../../dto/update-music.dto';
import { Music } from '../../entities/music.entity';
import { MusicRepository } from '../musics.repository';
import { FiltersMusicDto } from '../../dto/filter-music.dto';
import { MusicPagination } from '../../dto/pagination-music.dto';

@Injectable()
export class MusicInMemory implements MusicRepository {
  private database: Music[] = [];
  async create(data: CreateMusicDto): Promise<Music> {
    const newMusic = new Music();
    Object.assign(newMusic, {
      ...data,
      cover_image: data.cover_image || null,
      music_url: data.music_url || null,
    });

    this.database.push(newMusic);

    return newMusic;
  }

  private grouperby(music: Music[], key: string) {
    return music.reduce((acc, cur) => {
      (acc[cur[key]] = acc[cur[key]] || []).push(cur);
      return acc;
    }, {});
  }
  async findAll(group: string): Promise<object | Music[]> {
    if (group) {
      return this.grouperby(this.database, group);
    }
    return this.database;
  }

  async findByQuery(
    page: string,
    limit: string,
    filters?: FiltersMusicDto,
  ): Promise<MusicPagination> {
    throw new Error('Not implemented');
  }

  async findOne(id: string): Promise<Music> {
    const music = this.database.find((music) => music.id === id);
    return music;
  }
  async update(data: UpdateMusicDto, id: string): Promise<Music> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
}
