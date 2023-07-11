import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MusicRepository } from './repositories/musics.repository';
import { MusicInMemory } from './repositories/in-memory/music.in-memory.repository';

@Module({
  controllers: [MusicController],
  providers: [
    MusicService,
    {
      provide: MusicRepository,
      useClass: MusicInMemory,
    },
  ],
})
export class MusicModule {}
