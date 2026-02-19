import { RENDERING_PAGE, UI_MODE } from '../../constants/systemDefaults.js';

export function createTodoController({ appState, service }) {
  let renderLayout = () => {};
  let renderPage = () => {};
  let renderModal = () => {};

  return {
    attachRenderers(renderers) {
      renderLayout = renderers.renderLayout;
      renderModal = renderers.renderModal;
      renderPage = renderers.renderPage;
    },

    openDetail(todoId) {
      appState.renderingPage = RENDERING_PAGE.TODO_DETAIL;
      appState.activeTodoId = todoId;
      renderPage();
    },

    toggleComplete(todoId) {
      return service.toggleComplete(todoId);
    },

    requestCreate() {
      appState.uiMode = UI_MODE.CREATE_TODO;
      appState.activeTodoId = null;
      renderModal();
    },

    requestEdit(todoId) {
      appState.uiMode = UI_MODE.EDIT_TODO;
      appState.activeTodoId = todoId;
      renderModal();
    },

    cancelChanges() {
      appState.uiMode = UI_MODE.NONE;
      appState.activeTodoId = null;
    },

    saveTodo(data) {
      if (appState.uiMode === UI_MODE.CREATE_TODO) {
        service.createTodo(data);
      } else if (appState.uiMode === UI_MODE.EDIT_TODO) {
        service.updateTodo(data);
      }

      appState.activeProjectId = data.projectId;
      appState.activeTodoId = data.id;
      appState.uiMode = UI_MODE.NONE;
      renderModal();
      renderLayout();
      renderPage();
    },

    isOverdue(date) {
      return service.isOverdue(date);
    },

    deleteTodo(id) {
      service.deleteTodoById(id);

      appState.renderingPage = RENDERING_PAGE.PROJECT;
      renderPage();
    },
  };
}
