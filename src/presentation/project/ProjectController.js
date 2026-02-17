import { RENDERING_PAGE, UI_MODE } from '../../constants/systemDefaults.js';

export function createProjectController({ appState, service }) {
  let renderLayout = () => {};
  let renderPage = () => {};
  let renderModal = () => {};

  return {
    attachRenderers(renderers) {
      renderLayout = renderers.renderLayout;
      renderModal = renderers.renderModal;
      renderPage = renderers.renderPage;
    },

    getAllProject() {
      return service.getAllProject();
    },

    openProject(projectId) {
      appState.activeProjectId = projectId;
      appState.activeTodoId = null;
      appState.renderingPage = RENDERING_PAGE.PROJECT;
      renderPage();
    },

    requestCreate() {
      appState.uiMode = UI_MODE.CREATE_PROJECT;
      renderModal();
    },

    requestEdit(projectId) {
      appState.uiMode = UI_MODE.EDIT_PROJECT;
      appState.activeProjectId = projectId;
      renderModal();
    },

    cancelChanges() {
      appState.uiMode = UI_MODE.NONE;
    },

    saveProject(data) {
      if (appState.uiMode === UI_MODE.CREATE_PROJECT) {
        service.createProject(data);
      } else if (appState.uiMode === UI_MODE.EDIT_PROJECT) {
        service.updateProject(data);
      }

      appState.uiMode = UI_MODE.NONE;
      renderModal();
      renderLayout();
    },
  };
}
