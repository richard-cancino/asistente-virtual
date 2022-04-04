import cors from 'cors';
import { DBContext } from '@data/db.context';
import {
  AuthService,
  CitasMedicasService,
  DoctoresService,
  DoctorFechasService,
  EspecialidadesService,
  FechasCalendarioService,
  PacientesService,
  RecetasMedicasService,
} from '@logic/services/impl';
import '@web/controllers';
import { Application } from '@web/lib/abstract-application';
import express from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';
import { ErrorHandlerMiddleware } from './middlewares';

export class App extends Application {
  configureServices(container: Container): void {
    container.bind(DBContext).toSelf();
    container.bind(AuthService).toSelf();
    container.bind(CitasMedicasService).toSelf();
    container.bind(DoctorFechasService).toSelf();
    container.bind(DoctoresService).toSelf();
    container.bind(EspecialidadesService).toSelf();
    container.bind(FechasCalendarioService).toSelf();
    container.bind(PacientesService).toSelf();
    container.bind(RecetasMedicasService).toSelf();
  }
  setup(): void | Promise<void> {
    const dbContext = this._container.get(DBContext);

    dbContext.getConnection();

    const server = new InversifyExpressServer(this._container);

    server.setErrorConfig((app) => {
      app.use(ErrorHandlerMiddleware.handleError());
    });

    server.setConfig((app) => {
      app.use(express.json());
      app.use(morgan('dev'));
      app.use(cors());
    });

    const app = server.build();

    console.log(process.env);

    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
  }
}
