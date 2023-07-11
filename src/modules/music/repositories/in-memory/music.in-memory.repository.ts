import { CreateMusicDto } from '../../dto/create-music.dto';
import { UpdateMusicDto } from '../../dto/update-music.dto';
import { Music } from '../../entities/music.entity';
import { MusicRepository } from '../musics.repository';

export class MusicInMemory implements MusicRepository {
  private database: Music[] = [];
  async create(data: CreateMusicDto): Promise<Music> {
    const newMusic = new Music();
    Object.assign(newMusic, {
      ...data,
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

  async findOne(id: string): Promise<Music> {
    const music = this.database.find((music) => music.id === id);
    return music;
  }
  update(data: UpdateMusicDto, id: string): Music | Promise<Music> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
}
