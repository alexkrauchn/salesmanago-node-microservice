import { Request, Response, NextFunction } from 'express';

import { SalesManago } from '../services/SalesManago';

export class CartController {
	static async sendSalesManagoEvent(req:Request, res:Response, next:NextFunction):Promise<any> {
		const args = {
			email: req.body.email,
			locale: req.body.locale,
			type: req.body.type,
			action: req.body.action,
			products: req.body.products
		}
		console.log(args);
		// console.log(req.headers);
		SalesManago.sendCartEvent(args);
		res.status(200).json({ success: true, message: ''});
		return next();
	}
}