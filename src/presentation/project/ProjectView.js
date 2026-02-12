import { SYSTEM_PROJECTS } from '../../constants/systemDefaults.js';
import makeElement from '../../utils/makeElement.js';

export function renderActiveProjectSection({ name, description }) {
  const container = document.getElementById('main-content');
  if (!container) return;

  const section = makeElement('section', {
    class: 'project-section',
    children: [
      makeElement('h1', {
        class: 'project-title',
        text: name,
      }),
      makeElement('p', {
        class: 'project-description',
        text: description ?? '',
      }),
    ],
  });

  container.appendChild(section);
}

export function renderProject({ id, name }) {
  const projectList = document.getElementById('project-list');

  const projectItem = makeElement('li', {
    class: 'project-item',
    attrs: {
      'data-id': id,
    },
    children: [
      makeElement('button', {
        class: `btn-text ${id === SYSTEM_PROJECTS.DEFAULT_ID ? 'active' : ''}`,
        text: name,
      }),
    ],
  });

  projectList.appendChild(projectItem);
  return projectItem;
}

export function renderProjects(projects) {
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';

  if (!Array.isArray(projects)) throw new Error('Projects must be an Array');

  projects.forEach((project) => renderProject(project));
}
