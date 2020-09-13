import './env';

// import './di';
import express, { NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { Server } from 'http';
import _path from 'path';

import IRepository from './core/repository/definition';
import { container } from './di';
import { TYPES } from './di/types';
import errorHandlerMiddleware from './error-handler';
import { APINotFoundError } from './error-handler/definition';
import eventHandler from './event';
import coreMiddleware from './middleware';
import securityMiddleware from './middleware/security';
import preProcess from './preProcess';
import routes from './routes';
import swaggerRoute from './swagger';

const repository: IRepository = container.get<IRepository>(TYPES.IRepository);

preProcess();

const app = express();

app.use(fileUpload());
app.use(securityMiddleware);
app.use(swaggerRoute);
app.use(coreMiddleware);
app.use(routes);
// app.use((req: Request, res: Response, next: NextFunction) => { next(new APINotFoundError()); });
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV === 'prod') {
    app.use(express.static(__dirname + '/frontend'));
    app.get('*', (req, res) => {
      res.sendFile(_path.join(__dirname + '/frontend/index.html'));
    });
}

const server: Server = app.listen((process.env['NODE_PORT'] || process.env['APP.PORT']), () => {
  eventHandler.emit('sys-info', `Express app started at ${process.env['NODE_PORT'] || process.env['APP.PORT']}.`);
});

const closeApp = async (server: Server) => {
  try { await repository.disconnect(); } catch (err) { }
  try { server.close(); } catch (err) { }
  eventHandler.emit('sys-info', 'Shutting down app.');
  process.exit(0);
};

process.on('SIGINT', () => { closeApp(server); });
process.on('SIGTERM', () => { closeApp(server); });

export default app;
