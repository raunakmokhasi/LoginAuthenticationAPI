const winston = require('winston');

const { createLogger, transports, format } = require('winston');

const logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: 'infoLog.log',
        level: 'info',
        format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.errors({ stack: true }), format.splat(),format.json())
      }),
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.errors({ stack: true }), format.splat(),format.json())
      }),
      new transports.Http({
        level: 'warn',
        format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.errors({ stack: true }), format.splat(),format.json())
      }),
      new transports.Console({
        level: 'info',
        format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.errors({ stack: true }), format.splat(),format.json())
      })
    ]
});


module.exports = logger;