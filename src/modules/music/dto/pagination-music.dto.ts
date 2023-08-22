import { IsOptional } from 'class-validator';
import { Music } from '../entities/music.entity';

export class PaginationDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;
}

export interface iMusicFilter {
  genre: string[];
  name: string[];
  album: string[];
  artist: string[];
  year: string[];
}

export interface MusicPagination {
  pagination: {
    totalCount: number;
    pageNumber: number;
    limitNumber: number;
    totalPages: number;
    previousPageLink: string;
    nextPageLink: string;
  };
  filtersType: {
    genres: string[];
    names: string[];
    albuns: string[];
    artists: string[];
  };
  filtersTypeSearch: {
    genre: string[];
    name: string[];
    album: string[];
    artist: string[];
    year: string[];
  };
  data: Music[];
}
