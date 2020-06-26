import { GraphQLClient } from "graphql-request";
import { print } from "graphql";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: Date;
};

export type List = {
  id: Scalars["Int"];
  name: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  tasks: Array<Task>;
};

export type Mutation = {
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
  lists: Array<List>;
  tasks: Array<Task>;
};

export type Task = {
  id: Scalars["Int"];
  listId: Scalars["Int"];
  name: Scalars["String"];
  completed: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  list: List;
};

export type ListFieldsFragment = Pick<List, "id" | "name"> & {
  tasks: Array<TaskFieldsFragment>;
};

export type TaskFieldsFragment = Pick<Task, "id" | "listId" | "name" | "completed">;

export type CreateListMutationVariables = {
  name: Scalars["String"];
};

export type CreateListMutation = { createList: ListFieldsFragment };

export type CreateTaskMutationVariables = {
  listId: Scalars["Int"];
  name: Scalars["String"];
};

export type CreateTaskMutation = { createTask: TaskFieldsFragment };

export type DeleteListsMutationVariables = {
  ids: Array<Scalars["Int"]>;
};

export type DeleteListsMutation = Pick<Mutation, "deleteLists">;

export type DeleteTasksMutationVariables = {
  ids: Array<Scalars["Int"]>;
};

export type DeleteTasksMutation = Pick<Mutation, "deleteTasks">;

export type UpdateTaskMutationVariables = {
  id: Scalars["Int"];
  listId: Scalars["Int"];
  name: Scalars["String"];
  completed: Scalars["Boolean"];
};

export type UpdateTaskMutation = { updateTask: TaskFieldsFragment };

export type ListsQueryVariables = {};

export type ListsQuery = { lists: Array<ListFieldsFragment> };

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
export const CreateTaskDocument = gql`
  mutation CreateTask($listId: Int!, $name: String!) {
    createTask(listId: $listId, name: $name) {
      ...TaskFields
    }
  }
  ${TaskFieldsFragmentDoc}
`;
export const DeleteListsDocument = gql`
  mutation DeleteLists($ids: [Int!]!) {
    deleteLists(ids: $ids)
  }
`;
export const DeleteTasksDocument = gql`
  mutation DeleteTasks($ids: [Int!]!) {
    deleteTasks(ids: $ids)
  }
`;
export const UpdateTaskDocument = gql`
  mutation UpdateTask($id: Int!, $listId: Int!, $name: String!, $completed: Boolean!) {
    updateTask(id: $id, listId: $listId, name: $name, completed: $completed) {
      ...TaskFields
    }
  }
  ${TaskFieldsFragmentDoc}
`;
export const ListsDocument = gql`
  query Lists {
    lists {
      ...ListFields
    }
  }
  ${ListFieldsFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    CreateList(variables: CreateListMutationVariables): Promise<CreateListMutation> {
      return withWrapper(() =>
        client.request<CreateListMutation>(print(CreateListDocument), variables)
      );
    },
    CreateTask(variables: CreateTaskMutationVariables): Promise<CreateTaskMutation> {
      return withWrapper(() =>
        client.request<CreateTaskMutation>(print(CreateTaskDocument), variables)
      );
    },
    DeleteLists(variables: DeleteListsMutationVariables): Promise<DeleteListsMutation> {
      return withWrapper(() =>
        client.request<DeleteListsMutation>(print(DeleteListsDocument), variables)
      );
    },
    DeleteTasks(variables: DeleteTasksMutationVariables): Promise<DeleteTasksMutation> {
      return withWrapper(() =>
        client.request<DeleteTasksMutation>(print(DeleteTasksDocument), variables)
      );
    },
    UpdateTask(variables: UpdateTaskMutationVariables): Promise<UpdateTaskMutation> {
      return withWrapper(() =>
        client.request<UpdateTaskMutation>(print(UpdateTaskDocument), variables)
      );
    },
    Lists(variables?: ListsQueryVariables): Promise<ListsQuery> {
      return withWrapper(() =>
        client.request<ListsQuery>(print(ListsDocument), variables)
      );
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
