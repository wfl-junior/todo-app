export type LocaleKey = "en-us" | "pt-br";

type LocaleMapKey =
  | "errorDefault"
  | "errorFetch"
  | "listsCardTitle"
  | "tasksCardTitle"
  | "ammountTasksCompleted"
  | "listsInputPlaceholder"
  | "tasksInputPlaceholder"
  | "formButton"
  | "formButtonSubmitting"
  | "clearCompletedButton"
  | "deleteListButton"
  | "swalConfirmTitle"
  | "swalConfirmYesButton"
  | "swalConfirmNoButton"
  | "swalAddListSuccess"
  | "swalAddListError"
  | "swalDeleteListConfirm"
  | "swalDeleteListSuccess"
  | "swalDeleteListError"
  | "swalAddTaskSuccess"
  | "swalAddTaskError"
  | "swalClearCompletedEmpty"
  | "swalClearCompletedConfirm"
  | "swalClearCompletedSuccess"
  | "swalClearCompletedError"
  | "swalUpdateTaskError"
  | "swalDeleteTaskConfirm"
  | "swalDeleteTaskSuccess"
  | "swalDeleteTaskError";

type LocaleMap = Record<LocaleMapKey, string>;

export type Locale = Record<LocaleKey, LocaleMap>;
