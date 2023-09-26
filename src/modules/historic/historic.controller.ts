import {
  Body,
  Controller,
  Request,
  UseGuards,
  Post,
  Get,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HistoricService } from './historic.service';
import { JwtAuth } from '../auth/jwt-auth.guard';
import { CreateHistoryDto } from './dto/create-historic.dto';
import { User } from '../users/entities/user.entity';

@Controller('historic')
@ApiTags('Historics')
export class HistoricController {
  constructor(private readonly historicService: HistoricService) {}

  @Post()
  @UseGuards(JwtAuth)
  @ApiBearerAuth()
  create(@Body() createHistoryDto: CreateHistoryDto, @Request() req) {
    return this.historicService.create(createHistoryDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuth)
  @ApiBearerAuth()
  findAll() {
    return this.historicService.findAlll();
  }

  @Delete(':id')
  @UseGuards(JwtAuth)
  @HttpCode(204)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.historicService.remove(id);
  }
}
