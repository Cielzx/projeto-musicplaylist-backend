import { NotFoundException, Injectable } from '@nestjs/common';

import { CreateMusicDto } from './dto/create-music.dto';
import { v2 as cloud } from 'cloudinary';
import { MusicRepository } from './repositories/musics.repository';

@Injectable()
export class MusicService {
  constructor(private MusicRepository: MusicRepository) {}
  async create(createMusicDto: CreateMusicDto, userId: string) {
    const music = await this.MusicRepository.create(createMusicDto, userId);

    return music;
  }

  async findAll(group: string | undefined) {
    return await this.MusicRepository.findAll(group);
  }

  async findOne(id: string) {
    const music = await this.MusicRepository.findOne(id);

    if (!music) {
      throw new NotFoundException();
    }
    return music;
  }

  async upload(
    cover_image: Express.Multer.File,
    music: Express.Multer.File,
    id: string,
  ) {
    cloud.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const findMusic = await this.MusicRepository.findOne(id);
    if (!findMusic) {
      throw new NotFoundException('Music not found!');
    }

    const imageUpload = await cloud.uploader.upload(
      cover_image.path,
      { resource_type: 'image' },
      (error, result) => {
        return result;
      },
    );
    const audioUpload = await cloud.uploader.upload(
      music.path,
      { resource_type: 'video' },
      (error, result) => {
        return result;
      },
    );

    console.log(audioUpload, imageUpload);

    const updateMusic = await this.MusicRepository.update(
      {
        cover_image: imageUpload.secure_url,
        music_url: audioUpload.secure_url,
      },
      id,
    );

    return updateMusic;
  }

  remove(id: string) {
    return `This action removes a #${id} music`;
  }
}
