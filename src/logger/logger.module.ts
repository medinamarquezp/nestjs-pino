import { Module } from '@nestjs/common';
import { loggerConfig } from 'src/config/logger.config';
import { AppLogger } from './logger.service';

const logger = {
  provide: AppLogger,
  useValue: new AppLogger(loggerConfig),
};

@Module({
  providers: [logger],
  exports: [logger],
})
export class LoggerModule {}
