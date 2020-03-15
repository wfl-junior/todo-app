import { gql } from "apollo-boost";
import { listFieldsFragment } from "../fragments/listFields";

export const listsQuery = gql`
  query Lists {
    lists {
      ...ListFields
    }
  }

  ${listFieldsFragment}
`;
