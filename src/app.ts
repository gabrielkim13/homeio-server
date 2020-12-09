import express, { RequestHandler } from 'express';
import 'express-async-errors';

import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';

import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev') as RequestHandler);

app.use(routes);

app.use(errorMiddleware);

export default app;
