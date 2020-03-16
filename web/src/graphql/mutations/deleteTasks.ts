import gql from "graphql-tag";

export const deleteTasksMutation = gql`
  mutation DeleteTasks($ids: [Int!]!) {
    deleteTasks(ids: $ids)
  }
`;
