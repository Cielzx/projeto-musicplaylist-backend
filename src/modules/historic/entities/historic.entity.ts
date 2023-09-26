import { randomUUID } from 'crypto';

export class Historic {
  readonly id: string;

  music_name: string;

  artist: string;

  played_at: Date;

  constructor() {
    this.id = randomUUID();
  }
}
