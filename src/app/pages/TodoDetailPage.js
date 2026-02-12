import { renderTodoDetail } from '../../presentation/todo/TodoView.js';

export function renderTodoDetailPage({
  appState,
  todoService,
  projectService,
}) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';

  renderTodoDetail(
    todoService.getTodoById(appState.activeTodoId),
    projectService.getProjectById(appState.activeProjectId),
  );
}
