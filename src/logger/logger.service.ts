import pino, { TransportTargetOptions } from 'pino';
import { Injectable, LoggerService, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private context: string;
  private level: pino.Level;
  private logger: pino.Logger;
  private config: LoggerConfigInterface;

  constructor(config: LoggerConfigInterface) {
    this.context = 'LOGGER';
    this.level = config.level as pino.Level;
    this.config = config;
    this.logger = pino({
      level: this.level,
      transport: this.getTransport(config.transport),
      timestamp: pino.stdTimeFunctions.isoTime,
      enabled: process.env.NODE_ENV !== 'test',
    });
  }

  setContext(context: string): void {
    this.context = context;
  }

  info(message: string, context?: string, meta: object = {}): void {
    this.logWrapper('info', message, context, meta);
  }

  log(message: string, context?: string, meta: object = {}): void {
    this.info(message, context, meta);
  }

  error(message: string, context?: string, meta: object = {}): void {
    this.logWrapper('error', message, context, meta);
  }

  warn(message: string, context?: string, meta: object = {}): void {
    this.logWrapper('warn', message, context, meta);
  }

  debug(message: string, context?: string, meta: object = {}): void {
    this.logWrapper('debug', message, context, meta);
  }

  private logWrapper(
    type: string,
    message: string,
    context?: string,
    meta: object = {},
  ): void {
    const log = this.logger.child({
      context: context || this.context,
      ...meta,
    });
    log[type](message);
  }

  private getTransport(transport?: Transports) {
    const isProd = ['production', 'prod'].includes(process.env.NODE_ENV);
    const defaultTransport =
      transport === Transports.CONSOLE
        ? this.consoleTransport()
        : this.fileTransport();
    return isProd ? this.fileTransport() : defaultTransport;
  }

  private consoleTransport(): TransportTargetOptions {
    return {
      target: 'pino-pretty',
      level: this.level,
      options: {
        colorize: true,
        translateTime: 'yyyy-dd-mm, h:MM:ss TT',
      },
    };
  }

  private fileTransport(): TransportTargetOptions {
    return {
      target: 'pino/file',
      level: this.level,
      options: {
        destination: `${this.config.logsFilePath}${this.config.logsFileName}`,
        mkdir: true,
      },
    };
  }
}

export enum Transports {
  CONSOLE = 'console',
  FILE = 'file',
}
export interface LoggerConfigInterface {
  transport: Transports;
  level: string;
  logsFilePath: string;
  logsFileName: string;
}
