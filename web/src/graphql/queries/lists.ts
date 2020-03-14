import { gql } from "apollo-boost";
import { listFields } from "../fragments/listFields";

export const listsQuery = gql`
  query Lists {
    lists {
      ...ListFields
    }
  }

  ${listFields}
`;
