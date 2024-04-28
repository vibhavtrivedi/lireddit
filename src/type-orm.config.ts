import { DataSource } from "typeorm";
import path from "path";

  //Configuration of typeORM
  export const AppDataSource = new DataSource({
    name: "development",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "V!bhav@24",
    database: "lireddit",
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname, "./entities/**/*.ts")],
    migrations: [path.join(__dirname, "./migration/**/*.js")],
    subscribers: [],
  });