import 'dotenv/config';
import 'reflect-metadata';

import './models';
import './containers';

import app from './app';

app.listen(process.env.PORT || 3333);
