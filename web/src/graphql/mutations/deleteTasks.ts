import { gql } from "apollo-boost";

export const deleteTasksMutation = gql`
  mutation DeleteTasks($ids: [Int!]!) {
    deleteTasks(ids: $ids)
  }
`;
