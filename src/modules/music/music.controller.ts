import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { JwtAuth } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from './dto/pagination-music.dto';
import { FiltersMusicDto } from './dto/filter-music.dto';

@Controller('music')
@ApiTags('Musics')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  @UseGuards(JwtAuth)
  @ApiBearerAuth()
  create(@Body() createMusicDto: CreateMusicDto, @Request() req) {
    return this.musicService.create(createMusicDto, req.user.id);
  }

  @Get('')
  @ApiQuery({
    name: 'group',
    type: String,
    required: false,
  })
  findAll(
    @Query('group') group: string | undefined,
    @Query('genre') genre: string | undefined,
  ) {
    return this.musicService.findAll(group, genre);
  }

  @Get('pagination')
  findByQuery(
    @Query() PaginationDto: PaginationDto,
    @Query() filters?: FiltersMusicDto,
  ) {
    return this.musicService.findByQuery(PaginationDto, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(id);
  }

  @Patch('upload/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover_image', maxCount: 1 },
      { name: 'music', maxCount: 1 },
    ]),
  )
  upload(
    @UploadedFiles()
    files: {
      cover_image?: Express.Multer.File[];
      music?: Express.Multer.File[];
    },
    @Param('id') id: string,
  ) {
    const { cover_image, music } = files;
    return this.musicService.upload(cover_image[0], music[0], id);
  }

  @Delete(':id')
  @UseGuards(JwtAuth)
  @HttpCode(204)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.musicService.remove(id);
  }
}
