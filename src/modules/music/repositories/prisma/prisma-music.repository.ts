import { Injectable } from '@nestjs/common';
import { MusicRepository } from '../musics.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMusicDto } from '../../dto/create-music.dto';
import { UpdateMusicDto } from '../../dto/update-music.dto';
import { Music } from '../../entities/music.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MusicPrismaRepo implements MusicRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateMusicDto, userId: string): Promise<Music> {
    const music = new Music();
    Object.assign(music, {
      ...data,
    });
    const newMusic = await this.prisma.music.create({
      data: {
        id: music.id,
        album: music.album,
        artist: music.artist,
        genre: music.genre,
        name: music.name,
        year: music.year,
        cover_image: music.cover_image,
        music_url: music.music_url,
        userId,
      },
    });

    return newMusic;
  }

  async findById(id: string): Promise<Music> {
    const music = await this.prisma.music.findUnique({
      where: { id },
    });

    return plainToInstance(Music, music);
  }

  private grouperby(music: Music[], key: string) {
    return music.reduce((acc, cur) => {
      (acc[cur[key]] = acc[cur[key]] || []).push(cur);
      return acc;
    }, {});
  }
  async findAll(group: string): Promise<object | Music[]> {
    const musics = await this.prisma.music.findMany();
    if (group) {
      return this.grouperby(musics, group);
    }
    return musics;
  }
  async findOne(id: string): Promise<Music> {
    const music = await this.prisma.music.findUnique({
      where: {
        id,
      },
    });
    return music;
  }
  async update(data: UpdateMusicDto, id: string): Promise<Music> {
    const updateMusic = await this.prisma.music.update({
      where: { id },
      data: { ...data },
    });

    return updateMusic;
  }
  delete(id: string): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
}
