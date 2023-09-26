import { Injectable } from '@nestjs/common';
import { HistoricRepository } from './repositories/historic.repository';
import { CreateHistoryDto } from './dto/create-historic.dto';

@Injectable()
export class HistoricService {
  constructor(private HistoricRepo: HistoricRepository) {}

  async create(createHistoricDto: CreateHistoryDto, userId: string) {
    const music = await this.HistoricRepo.create(createHistoricDto, userId);
    return music;
  }

  async findAlll() {
    return await this.HistoricRepo.findAll();
  }

  async remove(id: string) {
    return await this.HistoricRepo.delete(id);
  }
}
