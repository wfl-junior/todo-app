import gql from "graphql-tag";

export const deleteListsMutation = gql`
  mutation DeleteLists($ids: [Int!]!) {
    deleteLists(ids: $ids)
  }
`;
