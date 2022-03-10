import { env } from './main.config';
import { LoggerConfigInterface, Transports } from 'src/logger/logger.service';

export const loggerConfig: LoggerConfigInterface = {
  transport: env
    .get('LOGGER_DEFAULT_TRANSPORT')
    .default('console')
    .asEnum(Object.values(Transports)),
  level: env.get('LOGGER_LEVEL').default('info').asString(),
  logsFilePath: env
    .get('LOGGER_FILE_PATH')
    .default(`${process.cwd()}/logs/`)
    .asString(),
  logsFileName: env.get('LOGGER_FILE_NAME').default('app.log').asString(),
};
