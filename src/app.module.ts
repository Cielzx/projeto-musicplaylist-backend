import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MusicModule } from './modules/music/music.module';

@Module({
  imports: [UsersModule, MusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
