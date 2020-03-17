export type LocaleKey = "en-us" | "pt-br";

export type Locale = {
  [K in LocaleKey]: {
    errorDefault: string;
    errorFetch: string;
    listsCardTitle: string;
    tasksCardTitle: string;
    ammountTasksCompleted: string;
    listsInputPlaceholder: string;
    tasksInputPlaceholder: string;
    formButton: string;
    formButtonSubmitting: string;
    clearCompletedButton: string;
    deleteListButton: string;
    swalConfirmTitle: string;
    swalConfirmYesButton: string;
    swalConfirmNoButton: string;
    swalAddListSuccess: string;
    swalAddListError: string;
    swalDeleteListConfirm: string;
    swalDeleteListSuccess: string;
    swalDeleteListError: string;
    swalAddTaskSuccess: string;
    swalAddTaskError: string;
    swalClearCompletedEmpty: string;
    swalClearCompletedConfirm: string;
    swalClearCompletedSuccess: string;
    swalClearCompletedError: string;
    swalUpdateTaskError: string;
    swalDeleteTaskConfirm: string;
    swalDeleteTaskSuccess: string;
    swalDeleteTaskError: string;
  };
};
