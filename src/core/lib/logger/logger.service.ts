import {
  Injectable,
  LoggerService as NestJSLoggerService,
  LogLevel,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  dateColor,
  errorColor,
  logColor,
  warnColor,
} from 'shared/constants/logger-colors.constant';
import { LoggerColorI } from 'shared/interfaces/general/logger-color.interface';
import { formattedDateForConsole } from 'shared/util/date.util';

@Injectable()
export class LoggerService implements NestJSLoggerService {
  constructor(private readonly configService: ConfigService) {}
  log(message: string, context: string) {
    console.log(
      this.formatLog(message + ' ✔', 'log', logColor, context ?? 'LOGGER'),
    );
  }

  error(message: string, context: string) {
    console.log(
      this.formatLog(message + ' ❗', 'error', errorColor, context ?? 'LOGGER'),
    );
  }

  warn(message: string, context: string) {
    console.log(
      this.formatLog(message + ' ❓', 'warn', warnColor, context ?? 'LOGGER'),
    );
  }

  formatLog(
    message: string,
    logLevel: LogLevel,
    loggerColor: LoggerColorI,
    context: string,
  ) {
    const { contextColor, messageColor } = loggerColor;
    const formattedMessage = `${messageColor}[${this.configService.get<string>(
      'APP_NAME',
    )}] ${messageColor}${
      process.pid
    } - ${dateColor}${formattedDateForConsole()}     ${messageColor}${logLevel.toUpperCase()} ${contextColor}[${context}] ${messageColor}${message}`;

    return formattedMessage;
  }
}
