import {
  RENDERING_PAGE,
  SYSTEM_PROJECTS,
  UI_MODE,
} from '../../constants/systemDefaults.js';

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
      let newProject;
      if (appState.uiMode === UI_MODE.CREATE_PROJECT) {
        newProject = service.createProject(data);
      } else if (appState.uiMode === UI_MODE.EDIT_PROJECT) {
        newProject = service.updateProject(data);
      }

      appState.activeProjectId = newProject.id;
      appState.uiMode = UI_MODE.NONE;
      renderModal();
      renderLayout();
      renderPage();
    },

    deleteProject(id) {
      if (id === SYSTEM_PROJECTS.DEFAULT_ID) return;
      service.deleteProjectById(id);

      appState.activeProjectId = SYSTEM_PROJECTS.DEFAULT_ID;
      renderLayout();
      renderPage();
    },
  };
}
