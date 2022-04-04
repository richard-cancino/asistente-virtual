import 'dotenv/config';
import 'reflect-metadata';
import { App } from '@web/application';

export async function bootstrap() {
  new App({
    defaultScope: 'Singleton',
    skipBaseClassChecks: true,
  });
}

bootstrap();