import { gql } from "apollo-boost";
import { taskFields } from "../fragments/taskFields";

export const createTaskMutation = gql`
  mutation CreateTask($listId: Int!, $name: String!) {
    createTask(listId: $listId, name: $name) {
      ...TaskFields
    }
  }

  ${taskFields}
`;
