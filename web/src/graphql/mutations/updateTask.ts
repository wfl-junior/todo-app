import { gql } from "apollo-boost";
import { taskFields } from "../fragments/taskFields";

export const updateTaskMutation = gql`
  mutation UpdateTask(
    $id: Int!
    $listId: Int!
    $name: String!
    $completed: Boolean!
  ) {
    updateTask(id: $id, listId: $listId, name: $name, completed: $completed) {
      ...TaskFields
    }
  }

  ${taskFields}
`;
