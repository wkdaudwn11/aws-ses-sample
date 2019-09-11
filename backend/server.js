import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import mailRouter from './router/mailRouter';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));

/* router */
app.use('/mail', mailRouter);

const PORT = process.env.PORT || 5000;
const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening());
