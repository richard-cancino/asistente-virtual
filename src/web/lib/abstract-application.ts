import { Container, interfaces } from 'inversify';

export abstract class Application {
  protected readonly _container: Container;

  constructor(options: interfaces.ContainerOptions) {
    this._container = new Container(options);
    this.configureServices(this._container);
    this.setup();
  }

  abstract configureServices(container: Container): void;
  abstract setup(): Promise<void> | void;
}