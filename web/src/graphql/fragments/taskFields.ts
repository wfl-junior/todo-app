import gql from "graphql-tag";

export const taskFieldsFragment = gql`
  fragment TaskFields on Task {
    id
    listId
    name
    completed
  }
`;
