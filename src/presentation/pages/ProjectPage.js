import { renderActiveProjectSection } from '../project/ProjectView.js';
import { bindTodoEvents } from '../todo/TodoController.js';
import {
  renderAddTodoBtn,
  renderTodoList,
  renderTodoSection,
} from '../todo/TodoView.js';

export function renderProjectPage(root, context) {
  const { appState, projectService, todoService, renderPage } = context;
  const activeProjectId = appState.activeProjectId;

  renderActiveProjectSection(
    root,
    projectService.getProjectById(activeProjectId),
  );
  const todoSection = renderTodoSection(root);
  const todoList = renderTodoList(
    todoSection,
    todoService.getTodosByProjectId(activeProjectId),
  );
  const addTodoBtn = renderAddTodoBtn(todoSection);

  todoSection.append(todoList, addTodoBtn);
  bindTodoEvents(todoList, { appState, service: todoService, renderPage });
}
