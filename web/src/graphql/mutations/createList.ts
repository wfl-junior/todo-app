import gql from "graphql-tag";
import { listFieldsFragment } from "../fragments/listFields";

export const createListMutation = gql`
  mutation CreateList($name: String!) {
    createList(name: $name) {
      ...ListFields
    }
  }

  ${listFieldsFragment}
`;
