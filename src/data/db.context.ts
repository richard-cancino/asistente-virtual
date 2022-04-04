import { injectable } from 'inversify';
import { createConnection, Connection, ObjectType } from 'typeorm';

@injectable()
export class DBContext {
  private static _connection: Connection;

  async getConnection() {
    if (DBContext._connection instanceof Connection) {
      return DBContext._connection;
    }

    try {
      DBContext._connection = await createConnection({
        type: process.env.CONNECTION_TYPE,
        host: process.env.HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [
          __dirname + '/../**/*.entity.ts'
        ],
        synchronize: process.env.TYPEORM_SYNCHRONIZE // false in production
      });

      return DBContext._connection;
    } catch (error ) {
      console.log(error);
      console.log("ERROR", "No se pudo conectar a la base de datos.");
      process.exit(1);
    }

  }

  async getRepository<T>(repository: ObjectType<T>): Promise<T> {
    const connection = await this.getConnection();
    return connection.getCustomRepository<T>(repository);
  }
}