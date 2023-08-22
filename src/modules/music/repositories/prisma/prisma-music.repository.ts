import { Injectable } from '@nestjs/common';
import { MusicRepository } from '../musics.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMusicDto } from '../../dto/create-music.dto';
import { UpdateMusicDto } from '../../dto/update-music.dto';
import { Music } from '../../entities/music.entity';
import { plainToInstance } from 'class-transformer';
import { FiltersMusicDto } from '../../dto/filter-music.dto';
import { filter } from 'rxjs';
import { MusicPagination, iMusicFilter } from '../../dto/pagination-music.dto';

@Injectable()
export class MusicPrismaRepo implements MusicRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateMusicDto, userId: string): Promise<Music> {
    const music = new Music();
    Object.assign(music, {
      ...data,
    });
    const newMusic = await this.prisma.music.create({
      data: {
        id: music.id,
        album: music.album,
        artist: music.artist,
        genre: music.genre,
        name: music.name,
        year: music.year,
        cover_image: music.cover_image,
        music_url: music.music_url,
        userId,
      },
    });

    return newMusic;
  }

  async findById(id: string): Promise<Music> {
    const music = await this.prisma.music.findUnique({
      where: { id },
    });

    return plainToInstance(Music, music);
  }

  private grouperby(music: Music[], key: string) {
    return music.reduce((acc, cur) => {
      (acc[cur[key]] = acc[cur[key]] || []).push(cur);
      return acc;
    }, {});
  }
  private findByGenre(genre: string) {
    return this.prisma.music.findMany({ where: { genre } });
  }
  async findAll(group: string, genre: string): Promise<object | Music[]> {
    const musics = await this.prisma.music.findMany();
    if (group) {
      return this.grouperby(musics, group);
    }

    if (genre) {
      return this.findByGenre(genre);
    }
    return musics;
  }
  async findOne(id: string): Promise<Music> {
    const music = await this.prisma.music.findUnique({
      where: {
        id,
      },
    });
    return music;
  }

  async findByQuery(
    page: string,
    limit: string,
    filters?: FiltersMusicDto,
  ): Promise<MusicPagination> {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const whereFilters: any = {
      ...filters,
    };

    function applyFilter(property: string) {
      if (filters && filters[property] && Array.isArray(filters[property])) {
        whereFilters[property] = {
          in: filters[property].map((value: string) => value),
        };
      }
    }

    if (filters && filters.album) {
      whereFilters.album = {
        ...(whereFilters.album || {}),
        gte: filters.album,
      };
    }

    if (filters && filters.genre) {
      whereFilters.genre = {
        ...(whereFilters.genre || {}),
        gte: filters.genre,
      };
    }

    if (filters && filters.artist) {
      whereFilters.artist = {
        ...(whereFilters.artist || {}),
        gte: filters.artist,
      };
    }

    if (filters && filters.name) {
      whereFilters.name = {
        ...(whereFilters.name || {}),
        gte: filters.name,
      };
    }

    applyFilter('genre');
    applyFilter('artist');
    applyFilter('name');
    applyFilter('album');

    const totalCount = await this.prisma.music.count({
      where: {
        ...whereFilters,
      },
    });

    const totalPages = Math.ceil(totalCount / limitNumber);

    const music = await this.prisma.music.findMany({
      where: {
        ...whereFilters,
      },
      select: {
        id: true,
        album: true,
        artist: true,
        name: true,
        year: true,
        cover_image: true,
        music_url: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      skip,
      take: limitNumber,
    });

    const previousPage = pageNumber > 1 ? pageNumber - 1 : null;
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;

    const baseUrl = 'https://localhost:3000/music';
    const queryParamsNext = `limit=${limit}&page=${nextPage}`;
    const queryParamsPrevious = `limit=${limit}&page=${previousPage}`;

    const previousPageLink = previousPage
      ? `${baseUrl}?${queryParamsPrevious}`
      : null;
    const nextPageLink = nextPage ? `${baseUrl}?${queryParamsNext}` : null;

    const distinctFilters = await this.prisma.music.findMany({
      select: {
        name: true,
        artist: true,
        album: true,
        genre: true,
      },
      distinct: ['album', 'artist', 'genre', 'name'],
    });

    const filtersType = {
      albuns: distinctFilters
        .map((item) => item.album)
        .filter((value, index, self) => self.indexOf(value) == index),
      artists: distinctFilters
        .map((item) => item.artist)
        .filter((value, index, self) => self.indexOf(value) == index),
      genres: distinctFilters
        .map((item) => item.genre)
        .filter((value, index, self) => self.indexOf(value) == index),
      names: distinctFilters
        .map((item) => item.name)
        .filter((value, index, self) => self.indexOf(value) == index),
    };

    const typeThisPage: iMusicFilter = {
      genre: [],
      name: [],
      album: [],
      artist: [],
      year: [],
    };

    return {
      pagination: {
        totalCount,
        pageNumber,
        limitNumber,
        totalPages,
        previousPageLink,
        nextPageLink,
      },
      filtersType,
      filtersTypeSearch: typeThisPage,
      data: plainToInstance(Music, music),
    };
  }

  async update(data: UpdateMusicDto, id: string): Promise<Music> {
    const updateMusic = await this.prisma.music.update({
      where: { id },
      data: { ...data },
    });

    return updateMusic;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.music.delete({
      where: { id },
    });
  }
}
