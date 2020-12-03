import 'dotenv/config';
import 'reflect-metadata';

import { createServer } from 'http';

import './models';
import './containers';

import app from './app';
import { initialize } from './events';

const http = createServer(app);
initialize(http);

http.listen(process.env.PORT || 3333);
