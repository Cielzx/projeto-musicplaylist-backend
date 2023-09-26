import { Injectable } from '@nestjs/common';
import { HistoricRepository } from '../historic.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateHistoryDto } from '../../dto/create-historic.dto';
import { Historic } from '../../entities/historic.entity';

@Injectable()
export class HistoricPrismaRepository implements HistoricRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHistoryDto, userId: string): Promise<Historic> {
    const historic = new Historic();
    Object.assign(historic, {
      ...data,
    });

    const newHistoric = await this.prisma.historic.create({
      data: {
        id: historic.id,
        music_name: historic.music_name,
        artist: historic.artist,
        played_at: historic.played_at,
        userId,
      },
      include: { user: true },
    });
    return newHistoric;
  }

  async findAll(): Promise<Historic[]> {
    const historics = this.prisma.historic.findMany();
    return historics;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.historic.delete({
      where: { id },
    });
  }
}
