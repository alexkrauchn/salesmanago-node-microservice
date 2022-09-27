import https from 'https';
import { logger } from '../middleware/logger';

export class SalesManago {
	static async sendCartEvent(args:any):Promise<any> {
		return new Promise((resolve, reject) => {
			const rawData = {
				clientId: process.env.SM_CLIENT_ID,
				apiKey: process.env.SM_API_KEY,
				requestTime: Date.now(),
				sha: process.env.SM_SHA,
				owner: process.env.SM_OWNER,
				email: args.email,
				contactEvent: {
					date: Date.now(),
					description: args.type + ' ' + args.action,
					location: (args.locale != '' && args.locale != 'de') ? 'shop_' + args.locale : 'shop_com',
					contactExtEventType: 'CART',
					shopDomain: 'shop.com',
					products: args.products,
					detail1: args.type,
					detail2: args.action
				}
			}

			const data = JSON.stringify(rawData);

			const options = {
				hostname: 'www.salesmanago.pl',
				port: 443,
				method: 'POST',
				path: '/api/v2/contact/addContactExtEvent',
				headers: {
	    			'Content-Type': 'application/json',
	    			'Content-Length': data.length,
	  			}
			}

			logger.info('Data: %o', rawData);
			logger.info('Options: %o', options);

			const req = https.request(options, res => {
	  			console.log(`statusCode: ${res.statusCode}`);
	  			let body:any[] = [];

	  			res.on('data', d => {
	    			body.push(d);
	  			});

	  			res.on('end', function(d:any) {
	  				try {
	                    body = JSON.parse(Buffer.concat(body).toString());
	                } catch(e) {
	                    reject(e);
	                }
	                logger.info('Response: %o', body);
	                resolve(body);
	  			});
			});

			req.on('error', error => {
	  			console.error(error);
	  			logger.error('%o', error);
	  			reject(error);
			});

			req.write(data);
			req.end();
		});
	}

	static async sendSignupEvent(args:any):Promise<any> {
		return new Promise((resolve, reject) => {
			const rawData = {
				clientId: process.env.SM_CLIENT_ID,
				apiKey: process.env.SM_API_KEY,
				requestTime: Date.now(),
				sha: process.env.SM_SHA,
				async: true,
				contact: {
					email: args.email,
					name: args.first_name + ' ' + args.last_name
				},
				owner: process.env.SM_OWNER,
				forceOptIn: true,
			    forceOptOut: false,
			    forcePhoneOptIn: true,
			    forcePhoneOptOut: false,
			    tags: args.tags,
			    lang: args.locale,
			    consentDetails: [
			    	{
			    		consentName: "CONSENT_NAME",
			            consentAccept: true,
			            agreementDate: Date.now(),
			            optOut: true,
			            consentDescriptionId: 1111,
			            ip: args.ip
			    	}
			    ]
			}

			const data = JSON.stringify(rawData);

			const options = {
				hostname: 'www.salesmanago.pl',
				port: 443,
				method: 'POST',
				path: '/api/contact/upsert',
				headers: {
	    			'Content-Type': 'application/json',
	    			'Content-Length': data.length,
	  			}
			}

			logger.info('Data: %o', rawData);
			logger.info('Options: %o', options);

			const req = https.request(options, res => {
	  			console.log(`statusCode: ${res.statusCode}`);
	  			let body:any[] = [];

	  			res.on('data', d => {
	    			body.push(d);
	  			});

	  			res.on('end', function(d:any) {
	  				try {
	                    body = JSON.parse(Buffer.concat(body).toString());
	                } catch(e) {
	                    reject(e);
	                }
	                logger.info('Response: %o', body);
	                resolve(body);
	  			});
			});

			req.on('error', error => {
	  			console.error(error);
	  			logger.error('%o', error);
	  			reject(error);
			});

			req.write(data);
			req.end();
		});
	}

}