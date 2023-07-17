import { BadRequestException, Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MusicRepository } from './repositories/musics.repository';
import { MusicInMemory } from './repositories/in-memory/music.in-memory.repository';
import { PrismaService } from 'src/database/prisma.service';
import { MusicPrismaRepo } from './repositories/prisma/prisma-music.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './temp',
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'audio/mpeg') {
          return cb(null, true);
        } else {
          return cb(new BadRequestException('Only the jpeg allowed'), false);
        }
      },
    }),
  ],
  controllers: [MusicController],
  providers: [
    MusicService,
    PrismaService,
    {
      provide: MusicRepository,
      useClass: MusicPrismaRepo,
    },
  ],
})
export class MusicModule {}
