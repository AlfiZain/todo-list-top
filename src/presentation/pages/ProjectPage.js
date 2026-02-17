import { renderActiveProjectSection } from '../project/ProjectView.js';
import {
  renderAddTodoBtn,
  renderTodoList,
  renderTodoSection,
} from '../todo/TodoView.js';

export function renderProjectPage(root, context) {
  const { appState, projectService, todoService, controller } = context;
  const activeProjectId = appState.activeProjectId;

  renderActiveProjectSection(
    root,
    projectService.getProjectById(activeProjectId),
  );

  const todoSection = renderTodoSection(root);
  const todos = todoService.getTodosByProjectId(activeProjectId);

  renderTodoList(todoSection, todos, controller.todoController);
  renderAddTodoBtn(todoSection, controller.todoController);
}
