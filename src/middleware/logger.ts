import winston from 'winston';
import { Request, Response, NextFunction } from 'express';

const { combine, timestamp, printf, align, splat } = winston.format;

export const logger = winston.createLogger({
  	level: process.env.LOG_LEVEL || 'info',
  	format: combine(timestamp({
	      	format: 'YYYY-MM-DD hh:mm:ss.SSS A',
	    }),
    	align(),
    	splat(),
    	printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
	),
  	transports: [
  		new winston.transports.Console(),
  		new winston.transports.File({
	      	filename: 'logs/combined.log',
	    }),
	],
});

const APIlogger = (req:Request, res:Response, next:NextFunction):void => {
	logger.info('Request: %o', req.body);
	// logger.info('Response: %o', res.status);
	next();
}

export default APIlogger;