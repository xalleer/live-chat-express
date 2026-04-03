import express, { Application } from 'express';
import { notFoundHandler } from './middlewares/notFoundHandler';
import authRouter from './router/auth.router';
import roomRouter from './router/room.router';
import { setupSwagger } from './swagger';

const app: Application = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/rooms', roomRouter);
setupSwagger(app);
app.use(notFoundHandler);

export default app;
