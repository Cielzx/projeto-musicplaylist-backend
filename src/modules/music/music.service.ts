import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './repositories/musics.repository';

@Injectable()
export class MusicService {
  constructor(private MusicRepository: MusicRepository) {}
  async create(createMusicDto: CreateMusicDto) {
    const music = await this.MusicRepository.create(createMusicDto);

    return music;
  }

  async findAll(group: string | undefined) {
    return await this.MusicRepository.findAll(group);
  }

  async findOne(id: string) {
    const music = await this.MusicRepository.findOne(id);
    return music;
  }

  update(id: string, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`;
  }

  remove(id: string) {
    return `This action removes a #${id} music`;
  }
}
