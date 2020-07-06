//Winston Code

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


/*

//BUNYAN CODE
const path = require("path");
const bunyan = require("bunyan");
const level = process.env.NODE_LOGGING_LEVEL || "info";

const bunyanLog = bunyan.createLogger({
  name: "LoginAuthentication",
  streams: [
    {
      level,
      stream: process.stdout
    },
    {
      level,
      path: path.resolve(__dirname, "..", "..", "bunyanLogs.json")
    }
  ]
});

module.exports = bunyanLog


*/