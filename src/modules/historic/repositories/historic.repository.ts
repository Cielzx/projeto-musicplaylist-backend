import { CreateHistoryDto } from '../dto/create-historic.dto';
import { Historic } from '../entities/historic.entity';

export abstract class HistoricRepository {
  abstract create(data: CreateHistoryDto, userId: string): Promise<Historic>;

  abstract findAll(): Promise<Historic[]>;

  abstract delete(id: string): Promise<void>;
}
