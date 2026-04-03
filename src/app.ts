import express, { Application } from 'express';
import { notFoundHandler } from './middlewares/notFoundHandler';
import authRouter from './router/auth.router';

const app: Application = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use(notFoundHandler);

export default app;
