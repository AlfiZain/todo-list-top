import { renderTodoDetail } from '../todo/TodoDetailView.js';

export function renderTodoDetailPage(root, context) {
  const { appState, projectService, todoService, controller } = context;

  renderTodoDetail(
    root,
    todoService.getTodoById(appState.activeTodoId),
    projectService.getProjectById(appState.activeProjectId),
    controller.todoController,
  );
}
