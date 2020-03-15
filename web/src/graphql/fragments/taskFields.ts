import { gql } from "apollo-boost";

export const taskFieldsFragment = gql`
  fragment TaskFields on Task {
    id
    listId
    name
    completed
  }
`;
