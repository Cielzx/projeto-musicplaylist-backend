import { Module } from '@nestjs/common';
import { HistoricController } from './historic.controller';
import { HistoricService } from './historic.service';
import { PrismaService } from 'src/database/prisma.service';
import { HistoricRepository } from './repositories/historic.repository';
import { HistoricPrismaRepository } from './repositories/prisma/prisma-music.repository';

@Module({
  controllers: [HistoricController],
  providers: [
    HistoricService,
    PrismaService,
    {
      provide: HistoricRepository,
      useClass: HistoricPrismaRepository,
    },
  ],
})
export class HistoricModule {}
