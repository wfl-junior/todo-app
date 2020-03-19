import gql from "graphql-tag";
import { listFieldsFragment } from "../fragments/listFields";

export const listsQuery = gql`
  query Lists {
    lists {
      ...ListFields
    }
  }

  ${listFieldsFragment}
`;
