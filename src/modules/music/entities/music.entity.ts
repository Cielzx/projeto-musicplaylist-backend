import { randomUUID } from 'node:crypto';

export class Music {
  readonly id: string;

  name: string;

  album: string;

  artist: string;

  genre: string;

  year: string;

  cover_image: string | null;

  music_url: string | null;

  user_id?: string;

  constructor() {
    this.id = randomUUID();
  }
}
