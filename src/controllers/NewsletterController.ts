import { Request, Response, NextFunction } from 'express';

import { SalesManago } from '../services/SalesManago';

export class NewsletterController {
	static async sendSalesManagoEvent(req:Request, res:Response, next:NextFunction):Promise<any> {
		const args = {
			email: req.body.email,
			locale: req.body.locale || 'en',
			tags: req.body.tags,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			country: req.body.country,
			ip: req.body.ip
		}
		console.log(args);
		// console.log(req.headers);
		const response = await SalesManago.sendSignupEvent(args);
		console.log(response);
		res.status(200).json({ success: response.success, message: response.message});
		return next();
	}
}