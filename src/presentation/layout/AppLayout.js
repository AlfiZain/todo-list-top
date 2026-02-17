import {
  renderAddProjectBtn,
  renderProjectList,
  renderProjectMenu,
} from '../project/ProjectView.js';

export function renderAppLayout(root, context) {
  const { appState, projectService, controller } = context;
  const activeProjectId = appState.activeProjectId;

  const projectMenu = renderProjectMenu(root);
  renderProjectList(
    projectMenu,
    projectService.getAllProject(),
    activeProjectId,
    controller.projectController,
  );
  renderAddProjectBtn(projectMenu, controller.projectController);
}
