import { DataSource } from "typeorm";
import path from "path";
import { Post } from "./entities/post.entity";
import { User } from "./entities/user.entity";

  //Configuration of typeORM
  export const AppDataSource = new DataSource({
    name: "development",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "V!bhav@24",
    database: "lireddit",
    synchronize: true,
    logging: true,
    entities: [Post, User],
    migrations: [path.join(__dirname, "./migrations/*")],
    subscribers: [],
  });