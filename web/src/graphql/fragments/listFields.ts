import { gql } from "apollo-boost";
import { taskFields } from "./taskFields";

export const listFields = gql`
  fragment ListFields on List {
    id
    name
    tasks {
      ...TaskFields
    }
  }

  ${taskFields}
`;
