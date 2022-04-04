declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    CONNECTION_TYPE: 'mysql';
    HOST: string;
    DB_PORT: number;
    PORT: string;
    DB_USERNAME: string;
    DATABASE: string;
    TYPEORM_SYNCHRONIZE: boolean;
    TYPEORM_ENTITIES: string;
    TOKEN_KEY: string;
  }
}
