import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MusicModule } from './modules/music/music.module';
import { AuthModule } from './modules/auth/auth.module';
import { HistoricModule } from './modules/historic/historic.module';

@Module({
  imports: [UsersModule, MusicModule, AuthModule, HistoricModule],
})
export class AppModule {}
