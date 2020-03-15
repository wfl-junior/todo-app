import { gql } from "apollo-boost";
import { taskFieldsFragment } from "./taskFields";

export const listFieldsFragment = gql`
  fragment ListFields on List {
    id
    name
    tasks {
      ...TaskFields
    }
  }

  ${taskFieldsFragment}
`;
