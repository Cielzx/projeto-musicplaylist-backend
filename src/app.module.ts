import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MusicModule } from './modules/music/music.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, MusicModule, AuthModule],
})
export class AppModule {}
