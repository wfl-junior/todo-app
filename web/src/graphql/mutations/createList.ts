import { gql } from "apollo-boost";
import { listFieldsFragment } from "../fragments/listFields";

export const createListMutation = gql`
  mutation CreateList($name: String!) {
    createList(name: $name) {
      ...ListFields
    }
  }

  ${listFieldsFragment}
`;
