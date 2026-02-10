import { renderProjects } from './ProjectView.js';

export function initProject(service) {
  const container = document.getElementById('project-list');
  if (!container) return;

  const projectDefault = service.initDefaultProject();
  container.dataset.activeProjectId = projectDefault.id;

  renderProjects(service.getAllProject());
}
