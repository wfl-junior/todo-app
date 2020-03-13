import "reflect-metadata";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import express from "express";

(async () => {
  await createConnection();

  const schema = await buildSchema({ resolvers });

  const server = new ApolloServer({ schema });

  const app = express();

  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
  });
})();
