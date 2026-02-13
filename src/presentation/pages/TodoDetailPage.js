import { renderTodoDetail } from '../todo/TodoView.js';

export function renderTodoDetailPage(root, context) {
  const { appState, projectService, todoService } = context;

  renderTodoDetail(
    todoService.getTodoById(appState.activeTodoId),
    projectService.getProjectById(appState.activeProjectId),
  );
}
