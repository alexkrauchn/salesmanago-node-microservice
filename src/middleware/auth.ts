import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { HTTPError } from './../models/HTTPError';
import { logger } from '../middleware/logger';

function validateToken(req:Request, res:Response, next:NextFunction):void {
	const bearerHeader = req.headers['authorization'];
	const secret = process.env.TOKEN_SECRET;
	
	if (bearerHeader) {
	    const bearer = bearerHeader.split(' ');
	    const token = bearer[1];

	    try {
		  	var decoded:any = jwt.verify(token, secret, { ignoreExpiration: true });
		  	// console.log(decoded);
		  	if (req.baseUrl == '/v1/cart') {
		  		if (decoded.email != req.body.email && !decoded.roles.includes('administrator')) {
		  			let error = new HTTPError('Wrong user Email', 403);
			  		logger.info('Error: %o', error);
			  		next(error);
		  		}
		  	} else {
		  		if (decoded.uid != req.params.userID && !decoded.roles.includes('administrator')) {
			  		let error = new HTTPError('Wrong user ID', 403);
			  		logger.info('Error: %o', error);
			  		next(error);
			  	}
		  	}
		  	next();
		} catch (err) {
		  	// console.log(err.message);
		  	let error = new HTTPError(err.message, 403);
		  	logger.info('Error: %o', error);
		  	next(error)
		}
	} else {
	    let error = new HTTPError('Invalid token', 403);
	    logger.info('Error: %o', error);
	    next(error)
	}
}

export default validateToken;