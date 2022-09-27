import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './routes/routes';
import validateToken from './middleware/auth';
import errorHandler from './middleware/error-handler';
import APIlogger from './middleware/logger';

const app = express(); 
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(APIlogger);

app.use('/v1/cart', validateToken);
app.use('/v1', router);

app.use(errorHandler);

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});