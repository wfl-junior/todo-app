import { gql } from "apollo-boost";

export const deleteListsMutation = gql`
  mutation DeleteLists($ids: [Int!]!) {
    deleteLists(ids: $ids)
  }
`;
