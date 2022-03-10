import { ConfigModule } from '@nestjs/config';
import * as envVars from 'env-var';

const envFilePath = `${process.cwd()}/.env`;

export const env = envVars;
export const configModule = ConfigModule.forRoot({ envFilePath });
