import AppState from './AppState.js';
import CryptoUUIDGenerator from '../infrastructure/generators/CryptoUUIDGenerator.js';
import LocalStorageAdapter from '../infrastructure/storage/LocalStorageAdapter.js';
import TodoRepository from '../features/todo/repositories/TodoRepository.js';
import ProjectRepository from '../features/project/repositories/ProjectRepository.js';
import TodoService from '../features/todo/services/TodoService.js';
import ProjectService from '../features/project/services/ProjectService.js';
import { bindTodoEvents } from '../presentation/todo/TodoController.js';
import { bindProjectEvents } from '../presentation/project/ProjectController.js';
import { VIEW_MODE } from '../constants/systemDefaults.js';
import { renderProjectPage } from './pages/ProjectPage.js';
import { renderTodoDetailPage } from './pages/TodoDetailPage.js';
import { renderProjects } from '../presentation/project/ProjectView.js';

export function initApp() {
  const idGenerator = new CryptoUUIDGenerator();
  const storage = new LocalStorageAdapter();

  const todoRepo = new TodoRepository(storage);
  const projectRepo = new ProjectRepository(storage);

  const todoService = new TodoService(todoRepo, projectRepo, idGenerator);
  const projectService = new ProjectService(projectRepo, idGenerator);

  const defaultProject = projectService.initDefaultProject();
  AppState.activeProjectId = defaultProject.id;
  AppState.viewMode = VIEW_MODE.PROJECT;

  const rerender = () => {
    renderApp({ appState: AppState, todoService, projectService });
    bindTodoEvents(todoService, AppState, rerender);
  };

  rerender();
  renderProjects(projectService.getAllProject());
  bindProjectEvents(projectService, AppState, rerender);
}

export function renderApp({ appState, todoService, projectService }) {
  if (appState.viewMode === VIEW_MODE.PROJECT) {
    renderProjectPage({ appState, todoService, projectService });
  } else if (appState.viewMode === VIEW_MODE.TODO_DETAIL) {
    renderTodoDetailPage({ appState, todoService, projectService });
  }
}
