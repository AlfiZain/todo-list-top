import { renderActiveProjectSection } from '../../presentation/project/ProjectView.js';
import {
  renderTodos,
  renderTodoSection,
} from '../../presentation/todo/TodoView.js';

export function renderProjectPage({ appState, projectService, todoService }) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';

  const activeProjectId = appState.activeProjectId;

  renderActiveProjectSection(projectService.getProjectById(activeProjectId));
  renderTodoSection();
  renderTodos(todoService.getTodosByProjectId(activeProjectId));
}
