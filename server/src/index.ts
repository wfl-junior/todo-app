import "reflect-metadata";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import express from "express";

(async () => {
  const [schema] = await Promise.all([
    buildSchema({
      resolvers: [`${__dirname}/resolvers/*Resolver.[tj]s`]
    }),
    createConnection()
  ]);

  const server = new ApolloServer({ schema });

  const app = express();

  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
})();
