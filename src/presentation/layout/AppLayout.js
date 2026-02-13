import { bindProjectEvents } from '../project/ProjectController.js';
import {
  renderAddProjectBtn,
  renderProjectList,
  renderProjectMenu,
} from '../project/ProjectView.js';

export function renderAppLayout(root, context) {
  const { appState, projectService } = context;
  const activeProjectId = appState.activeProjectId;

  const projectMenu = renderProjectMenu(root);
  const projectList = renderProjectList(
    projectMenu,
    projectService.getAllProject(),
    activeProjectId,
  );
  const addProjectBtn = renderAddProjectBtn(projectMenu);

  projectMenu.append(projectList, addProjectBtn);
  bindProjectEvents(projectList, context);
}
