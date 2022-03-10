import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModule } from './config/main.config';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule, configModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
