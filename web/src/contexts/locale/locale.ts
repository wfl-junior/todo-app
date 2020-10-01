import { Locale, LocaleKey } from "./types";

export const locale: Locale = {
  "en-us": {
    errorDefault: "An unexpected error has occurred...",
    errorFetch: "An error occurred while fetching data...",
    listsCardTitle: "Lists",
    tasksCardTitle: "Tasks",
    ammountTasksCompleted: "$1 of $2 completed",
    listsInputPlaceholder: "Add a list...",
    tasksInputPlaceholder: "Add a task...",
    formButton: "Submit",
    formButtonSubmitting: "Submitting...",
    clearCompletedButton: "Clear completed",
    deleteListButton: "Delete list",
    swalConfirmTitle: "Warning!",
    swalConfirmYesButton: "Yes!",
    swalConfirmNoButton: "No!",
    swalAddListSuccess: "List created!",
    swalAddListError: "An error occured while adding the list...",
    swalDeleteListConfirm:
      "Are you sure you want to delete the list and its tasks? <br /> This action cannot be reversed.",
    swalDeleteListSuccess: "List deleted!",
    swalDeleteListError: "An error occurred while deleting the list...",
    swalAddTaskSuccess: "Task created!",
    swalAddTaskError: "An error occurred while adding the task...",
    swalClearCompletedEmpty: "No completed task to delete!",
    swalClearCompletedConfirm:
      "Are you sure you want to delete this list's completed tasks? <br /> This action cannot be reversed.",
    swalClearCompletedSuccess: "Completed tasks deleted!",
    swalClearCompletedError: "An error occurred while deleting the completed tasks...",
    swalUpdateTaskError: "An error occurred while updating the task...",
    swalDeleteTaskConfirm:
      "Are you sure you want to delete this task? <br /> This action cannot be reversed.",
    swalDeleteTaskSuccess: "Task deleted!",
    swalDeleteTaskError: "An error occurred while deleting the task..."
  },
  "pt-br": {
    errorDefault: "Ocorreu um erro inesperado...",
    errorFetch: "Ocorreu um erro ao buscar os dados...",
    listsCardTitle: "Listas",
    tasksCardTitle: "Tarefas",
    ammountTasksCompleted: "$1 de $2 completas",
    listsInputPlaceholder: "Adicionar uma lista...",
    tasksInputPlaceholder: "Adicionar uma tarefa...",
    formButton: "Enviar",
    formButtonSubmitting: "Enviando...",
    clearCompletedButton: "Limpar completas",
    deleteListButton: "Deletar lista",
    swalConfirmTitle: "Atenção!",
    swalConfirmYesButton: "Sim!",
    swalConfirmNoButton: "Não!",
    swalAddListSuccess: "Lista adicionada!",
    swalAddListError: "Ocorreu um erro ao criar a lista...",
    swalDeleteListConfirm:
      "Deseja mesmo apagar esta lista e todas as suas tarefas? <br /> Esta ação não pode ser revertida.",
    swalDeleteListSuccess: "Lista deletada!",
    swalDeleteListError: "Ocorreu um erro ao deletar a lista...",
    swalAddTaskSuccess: "Tarefa adicionada!",
    swalAddTaskError: "Ocorreu um erro ao criar a tarefa...",
    swalClearCompletedEmpty: "Nenhuma tarefa completa para ser deletada!",
    swalClearCompletedConfirm:
      "Deseja mesmo apagar as tarefas completas desta lista? <br /> Esta ação não pode ser revertida.",
    swalClearCompletedSuccess: "Tarefas completas deletadas!",
    swalClearCompletedError: "Ocorreu um erro ao deletar as tarefas completas...",
    swalUpdateTaskError: "Ocorreu um erro ao atualizar a tarefa...",
    swalDeleteTaskConfirm:
      "Deseja mesmo apagar esta tarefa? <br /> Esta ação não pode ser revertida.",
    swalDeleteTaskSuccess: "Tarefa deletada!",
    swalDeleteTaskError: "Ocorreu um erro ao deletar a tarefa..."
  }
};

export const supportedLocales = Object.keys(locale) as LocaleKey[];
