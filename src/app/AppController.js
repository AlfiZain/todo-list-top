import AppState from './AppState.js';
import CryptoUUIDGenerator from '../infrastructure/generators/CryptoUUIDGenerator.js';
import LocalStorageAdapter from '../infrastructure/storage/LocalStorageAdapter.js';
import TodoRepository from '../features/todo/repositories/TodoRepository.js';
import ProjectRepository from '../features/project/repositories/ProjectRepository.js';
import TodoService from '../features/todo/services/TodoService.js';
import ProjectService from '../features/project/services/ProjectService.js';
import { VIEW_MODE } from '../constants/systemDefaults.js';
import { renderProjectPage } from '../presentation/pages/ProjectPage.js';
import { renderTodoDetailPage } from '../presentation/pages/TodoDetailPage.js';
import { renderAppLayout } from '../presentation/layout/AppLayout.js';

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

  const renderLayout = () => {
    const sidebar = document.getElementById('sidebar');
    const context = {
      appState: AppState,
      todoService,
      projectService,
      renderPage,
    };

    renderAppLayout(sidebar, context);
  };

  const renderPage = () => {
    const root = document.getElementById('main-content');
    root.innerHTML = '';

    const context = {
      appState: AppState,
      todoService,
      projectService,
      renderPage,
    };

    if (AppState.viewMode === VIEW_MODE.PROJECT) {
      renderProjectPage(root, context);
    } else if (AppState.viewMode === VIEW_MODE.TODO_DETAIL) {
      renderTodoDetailPage(root, context);
    }
  };

  renderLayout();
  renderPage();
}
