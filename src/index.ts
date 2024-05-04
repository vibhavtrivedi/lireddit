import "reflect-metadata";
import { __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

import { AppDataSource } from "./type-orm.config";
import { PhotoResolver } from "./resolvers/photo";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import cors from "cors";

var session = require('express-session')
import { createClient } from "redis";
import RedisStore from "connect-redis";

const main = async () => {
  try {
    //It performs connection to the db
    console.log("__dirname__dirname__dirname", __dirname);
    await AppDataSource.initialize();
    console.log("Data source initialized successfully.");
  } catch (error) {
    console.error("Error initializing data source:", error);
  }
  const app = express();
  // Initialize client.
  let redisClient = createClient();
  // Initialize store.
  
  let redisStore = new (RedisStore as any)({
    client: redisClient,
  });
  //for cors
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  // Initialize session storage.
  app.use(
    session({
      name: "quid",
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__
      },
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: "isfsabofbisaobfiasf",
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PhotoResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false } as any);

  const PORT = 4000;
  await new Promise((resolve) => {
    app.listen(PORT, () => {
      console.log(`Express server listening on port ${PORT}`);
      resolve(null);
    });
  });

  console.log("Apollo Server started.");
};
main().catch((er) => {
  console.log("Errorr", er);
});
