import { gql } from "apollo-boost";

export const taskFields = gql`
  fragment TaskFields on Task {
    id
    listId
    name
    completed
  }
`;
