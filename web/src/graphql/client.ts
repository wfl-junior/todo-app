import { GraphQLClient } from "graphql-request";
import { getSdk } from ".";

export const client = getSdk(
  new GraphQLClient("http://localhost:4000/graphql")
);
