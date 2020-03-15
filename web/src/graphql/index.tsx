import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type List = {
  __typename?: "List";
  id: Scalars["Int"];
  name: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  tasks: Array<Task>;
};

export type Mutation = {
  __typename?: "Mutation";
  createList: List;
  deleteLists: Scalars["Boolean"];
  createTask: Task;
  updateTask: Task;
  deleteTasks: Scalars["Boolean"];
};

export type MutationCreateListArgs = {
  name: Scalars["String"];
};

export type MutationDeleteListsArgs = {
  ids: Array<Scalars["Int"]>;
};

export type MutationCreateTaskArgs = {
  name: Scalars["String"];
  listId: Scalars["Int"];
};

export type MutationUpdateTaskArgs = {
  name: Scalars["String"];
  listId: Scalars["Int"];
  id: Scalars["Int"];
  completed: Scalars["Boolean"];
};

export type MutationDeleteTasksArgs = {
  ids: Array<Scalars["Int"]>;
};

export type Query = {
  __typename?: "Query";
  lists: Array<List>;
  tasks: Array<Task>;
};

export type Task = {
  __typename?: "Task";
  id: Scalars["Int"];
  listId: Scalars["Int"];
  name: Scalars["String"];
  completed: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  list: List;
};

export type ListFieldsFragment = { __typename?: "List" } & Pick<
  List,
  "id" | "name"
> & { tasks: Array<{ __typename?: "Task" } & TaskFieldsFragment> };

export type TaskFieldsFragment = { __typename?: "Task" } & Pick<
  Task,
  "id" | "listId" | "name" | "completed"
>;

export type CreateListMutationVariables = {
  name: Scalars["String"];
};

export type CreateListMutation = { __typename?: "Mutation" } & {
  createList: { __typename?: "List" } & ListFieldsFragment;
};

export type CreateTaskMutationVariables = {
  listId: Scalars["Int"];
  name: Scalars["String"];
};

export type CreateTaskMutation = { __typename?: "Mutation" } & {
  createTask: { __typename?: "Task" } & TaskFieldsFragment;
};

export type DeleteListsMutationVariables = {
  ids: Array<Scalars["Int"]>;
};

export type DeleteListsMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteLists"
>;

export type DeleteTasksMutationVariables = {
  ids: Array<Scalars["Int"]>;
};

export type DeleteTasksMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteTasks"
>;

export type UpdateTaskMutationVariables = {
  id: Scalars["Int"];
  listId: Scalars["Int"];
  name: Scalars["String"];
  completed: Scalars["Boolean"];
};

export type UpdateTaskMutation = { __typename?: "Mutation" } & {
  updateTask: { __typename?: "Task" } & TaskFieldsFragment;
};

export type ListsQueryVariables = {};

export type ListsQuery = { __typename?: "Query" } & {
  lists: Array<{ __typename?: "List" } & ListFieldsFragment>;
};

export const TaskFieldsFragmentDoc = gql`
  fragment TaskFields on Task {
    id
    listId
    name
    completed
  }
`;
export const ListFieldsFragmentDoc = gql`
  fragment ListFields on List {
    id
    name
    tasks {
      ...TaskFields
    }
  }
  ${TaskFieldsFragmentDoc}
`;
export const CreateListDocument = gql`
  mutation CreateList($name: String!) {
    createList(name: $name) {
      ...ListFields
    }
  }
  ${ListFieldsFragmentDoc}
`;
export type CreateListMutationFn = ApolloReactCommon.MutationFunction<
  CreateListMutation,
  CreateListMutationVariables
>;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateListMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateListMutation,
    CreateListMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateListMutation,
    CreateListMutationVariables
  >(CreateListDocument, baseOptions);
}
export type CreateListMutationHookResult = ReturnType<
  typeof useCreateListMutation
>;
export type CreateListMutationResult = ApolloReactCommon.MutationResult<
  CreateListMutation
>;
export type CreateListMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateListMutation,
  CreateListMutationVariables
>;
export const CreateTaskDocument = gql`
  mutation CreateTask($listId: Int!, $name: String!) {
    createTask(listId: $listId, name: $name) {
      ...TaskFields
    }
  }
  ${TaskFieldsFragmentDoc}
`;
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >(CreateTaskDocument, baseOptions);
}
export type CreateTaskMutationHookResult = ReturnType<
  typeof useCreateTaskMutation
>;
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<
  CreateTaskMutation
>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;
export const DeleteListsDocument = gql`
  mutation DeleteLists($ids: [Int!]!) {
    deleteLists(ids: $ids)
  }
`;
export type DeleteListsMutationFn = ApolloReactCommon.MutationFunction<
  DeleteListsMutation,
  DeleteListsMutationVariables
>;

/**
 * __useDeleteListsMutation__
 *
 * To run a mutation, you first call `useDeleteListsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListsMutation, { data, loading, error }] = useDeleteListsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteListsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteListsMutation,
    DeleteListsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteListsMutation,
    DeleteListsMutationVariables
  >(DeleteListsDocument, baseOptions);
}
export type DeleteListsMutationHookResult = ReturnType<
  typeof useDeleteListsMutation
>;
export type DeleteListsMutationResult = ApolloReactCommon.MutationResult<
  DeleteListsMutation
>;
export type DeleteListsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteListsMutation,
  DeleteListsMutationVariables
>;
export const DeleteTasksDocument = gql`
  mutation DeleteTasks($ids: [Int!]!) {
    deleteTasks(ids: $ids)
  }
`;
export type DeleteTasksMutationFn = ApolloReactCommon.MutationFunction<
  DeleteTasksMutation,
  DeleteTasksMutationVariables
>;

/**
 * __useDeleteTasksMutation__
 *
 * To run a mutation, you first call `useDeleteTasksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTasksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTasksMutation, { data, loading, error }] = useDeleteTasksMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteTasksMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteTasksMutation,
    DeleteTasksMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteTasksMutation,
    DeleteTasksMutationVariables
  >(DeleteTasksDocument, baseOptions);
}
export type DeleteTasksMutationHookResult = ReturnType<
  typeof useDeleteTasksMutation
>;
export type DeleteTasksMutationResult = ApolloReactCommon.MutationResult<
  DeleteTasksMutation
>;
export type DeleteTasksMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteTasksMutation,
  DeleteTasksMutationVariables
>;
export const UpdateTaskDocument = gql`
  mutation UpdateTask(
    $id: Int!
    $listId: Int!
    $name: String!
    $completed: Boolean!
  ) {
    updateTask(id: $id, listId: $listId, name: $name, completed: $completed) {
      ...TaskFields
    }
  }
  ${TaskFieldsFragmentDoc}
`;
export type UpdateTaskMutationFn = ApolloReactCommon.MutationFunction<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      listId: // value for 'listId'
 *      name: // value for 'name'
 *      completed: // value for 'completed'
 *   },
 * });
 */
export function useUpdateTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >(UpdateTaskDocument, baseOptions);
}
export type UpdateTaskMutationHookResult = ReturnType<
  typeof useUpdateTaskMutation
>;
export type UpdateTaskMutationResult = ApolloReactCommon.MutationResult<
  UpdateTaskMutation
>;
export type UpdateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;
export const ListsDocument = gql`
  query Lists {
    lists {
      ...ListFields
    }
  }
  ${ListFieldsFragmentDoc}
`;

/**
 * __useListsQuery__
 *
 * To run a query within a React component, call `useListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ListsQuery,
    ListsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ListsQuery, ListsQueryVariables>(
    ListsDocument,
    baseOptions
  );
}
export function useListsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ListsQuery,
    ListsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ListsQuery, ListsQueryVariables>(
    ListsDocument,
    baseOptions
  );
}
export type ListsQueryHookResult = ReturnType<typeof useListsQuery>;
export type ListsLazyQueryHookResult = ReturnType<typeof useListsLazyQuery>;
export type ListsQueryResult = ApolloReactCommon.QueryResult<
  ListsQuery,
  ListsQueryVariables
>;
