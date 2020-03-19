import gql from "graphql-tag";
import { taskFieldsFragment } from "../fragments/taskFields";

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

  ${taskFieldsFragment}
`;
