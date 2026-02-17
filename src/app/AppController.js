import AppState from './AppState.js';
import CryptoUUIDGenerator from '../infrastructure/generators/CryptoUUIDGenerator.js';
import LocalStorageAdapter from '../infrastructure/storage/LocalStorageAdapter.js';
import TodoRepository from '../features/todo/repositories/TodoRepository.js';
import ProjectRepository from '../features/project/repositories/ProjectRepository.js';
import TodoService from '../features/todo/services/TodoService.js';
import ProjectService from '../features/project/services/ProjectService.js';
import { RENDERING_PAGE, UI_MODE } from '../constants/systemDefaults.js';
import { renderProjectPage } from '../presentation/pages/ProjectPage.js';
import { renderTodoDetailPage } from '../presentation/pages/TodoDetailPage.js';
import { renderAppLayout } from '../presentation/layout/AppLayout.js';
import { createDialog } from '../presentation/components/Dialog.js';
import { renderTodoForm } from '../presentation/todo/TodoFormView.js';
import { createTodoController } from '../presentation/todo/TodoController.js';
import { createProjectController } from '../presentation/project/ProjectController.js';
import { renderProjectForm } from '../presentation/project/ProjectFormView.js';
import { createUserInfo } from '../presentation/components/UserInfo.js';

export function initApp() {
  const idGenerator = new CryptoUUIDGenerator();
  const storage = new LocalStorageAdapter();

  const todoRepo = new TodoRepository(storage);
  const projectRepo = new ProjectRepository(storage);

  const todoService = new TodoService(todoRepo, projectRepo, idGenerator);
  const projectService = new ProjectService(projectRepo, idGenerator);

  const defaultProject = projectService.initDefaultProject();
  AppState.activeProjectId = defaultProject.id;
  AppState.renderingPage = RENDERING_PAGE.PROJECT;

  const modal = createDialog(document.body);

  const todoController = createTodoController({
    appState: AppState,
    service: todoService,
  });

  const projectController = createProjectController({
    appState: AppState,
    service: projectService,
  });

  const context = {
    appState: AppState,
    todoService,
    projectService,
  };

  const renderLayout = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';
    createUserInfo(sidebar);

    renderAppLayout(sidebar, { ...context, controller: { projectController } });
  };

  const renderPage = () => {
    const root = document.getElementById('main-content');
    root.innerHTML = '';

    if (AppState.renderingPage === RENDERING_PAGE.PROJECT) {
      renderProjectPage(root, {
        ...context,
        controller: { projectController, todoController },
      });
    } else if (AppState.renderingPage === RENDERING_PAGE.TODO_DETAIL) {
      renderTodoDetailPage(root, {
        ...context,
        controller: { todoController },
      });
    }
  };

  const renderModal = () => {
    if (AppState.uiMode === UI_MODE.CREATE_TODO) {
      renderTodoForm(modal, true, null, AppState.activeProjectId, {
        projectController,
        todoController,
      });
    } else if (AppState.uiMode === UI_MODE.EDIT_TODO) {
      const todo = todoService.getTodoById(AppState.activeTodoId);
      renderTodoForm(modal, false, todo, AppState.activeProjectId, {
        projectController,
        todoController,
      });
    } else if (AppState.uiMode === UI_MODE.CREATE_PROJECT) {
      renderProjectForm(modal, true, null, { projectController });
    } else if (AppState.uiMode === UI_MODE.EDIT_PROJECT) {
      const project = projectService.getProjectById(AppState.activeProjectId);
      renderProjectForm(modal, false, project, { projectController });
    } else {
      modal.close();
    }
  };

  todoController.attachRenderers({ renderLayout, renderPage, renderModal });
  projectController.attachRenderers({ renderLayout, renderPage, renderModal });

  renderLayout();
  renderPage();
}
