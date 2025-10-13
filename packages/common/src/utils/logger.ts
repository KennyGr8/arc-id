import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'
import { config } from '../configs'

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    ({ level, message, timestamp }) =>
      `${timestamp} [${level.toUpperCase()}]: ${message}`
  )
)

export const logger = createLogger({
  level: config.APP.NODE_ENV === 'production' ? 'info' : 'debug',
  // OR:
  // get level() {
  //   return config.APP.NODE_ENV === 'production' ? 'info' : 'debug';
  // },
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      dirname: 'logs',
      filename: '%DATE%-app.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: `${config.LOGGING.RETENTION_DAYS}d`,
    }),
  ],
})
