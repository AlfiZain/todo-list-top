import makeElement from '../../utils/makeElement.js';

export function renderProject({ id, name }) {
  const projectList = document.getElementById('project-list');
  const activeProjectId = projectList.dataset.activeProjectId;

  const projectItem = makeElement('li', {
    class: 'project-item',
    attrs: {
      'data-id': id,
    },
    children: [
      makeElement('button', {
        class: `btn-text ${activeProjectId === id ? 'active' : ''}`,
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
