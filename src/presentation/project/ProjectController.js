import { VIEW_MODE } from '../../constants/systemDefaults.js';

export function bindProjectEvents(service, appState, rerender) {
  const container = document.getElementById('project-list');
  if (!container) return;

  container.addEventListener('click', (e) => {
    handleProjectClick(e, appState, rerender);
  });
}

function handleProjectClick(event, appState, rerender) {
  const projectItem = event.target.closest('.project-item');
  if (!projectItem) return;

  const buttons = document.querySelectorAll('.project-list .btn-text');
  buttons.forEach((button) => button.classList.remove('active'));

  const button = event.target.closest('.btn-text');
  button.classList.add('active');

  const projectId = projectItem.dataset.id;
  appState.activeProjectId = projectId;
  appState.activeTodoId = null;
  appState.viewMode = VIEW_MODE.PROJECT;

  rerender();
}
