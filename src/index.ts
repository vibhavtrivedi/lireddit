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

const main = async () => {

  try {
    //It performs connection to the db
    console.log("__dirname__dirname__dirname", __dirname);
    await AppDataSource.initialize();
    console.log("Data source initialized successfully.");

    // Create and save a new photo
    // const photo = new PhotoType();
    // photo.name = "Me and Bears";
    // photo.description = "I am near polar bears";
    // photo.filename = "photo-with-bears.jpg";
    // photo.views = 1;
    // photo.isPublished = true;


    //Create a post
    // const user = new User();
    // // console.log("-------------post", post);
    // // post.title = "Vibs title"
    // user.username = "vib";
    // user.password = "vib";
    // await AppDataSource.manager.save(user);
    // console.log("Post has been saved. Photo id is", post.id);
  } catch (error) {
    console.error("Error initializing data source:", error);
  }
  const app = express();
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
  apolloServer.applyMiddleware({ app } as any);

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
  console.log("Error", er);
});
