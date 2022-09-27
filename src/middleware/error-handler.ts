import { Request, Response, NextFunction } from 'express';
import { HTTPError } from './../models/HTTPError';

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function errorHandler(
    err: TypeError | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let customError = err;
    let errorMessage:string = process.env.NODE_ENV == 'development' ? err.message : 'Server error';

    if (!(err instanceof HTTPError)) {
        customError = new HTTPError(
            errorMessage
        );
    }

    // we are not using the next function to prvent from triggering
    // the default error-handler. However, make sure you are sending a
    // response to client to prevent memory leaks in case you decide to
    // NOT use, like in this example, the NextFunction .i.e., next(new Error())
    res.status((customError as HTTPError).status).send(customError);
};

export default errorHandler;