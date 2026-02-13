import makeElement from '../../utils/makeElement.js';

export function renderActiveProjectSection(container, { name, description }) {
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

  container.append(section);
  return section;
}

export function renderProjectMenu(container) {
  const projectMenu = makeElement('nav', {
    class: 'project-menu',
  });

  container.append(projectMenu);
  return projectMenu;
}

export function renderAddProjectBtn(container) {
  const addProjectBtn = makeElement('button', {
    id: 'add-project-btn',
    class: 'btn-text',
    text: '+ Add Project',
  });

  container.append(addProjectBtn);
  return addProjectBtn;
}

export function renderProjectList(container, projects, activeId) {
  if (!Array.isArray(projects)) throw new Error('Projects must be an Array');

  const projectList = makeElement('ul', {
    id: 'project-list',
    class: 'project-list',
  });

  const fragment = document.createDocumentFragment();

  projects.forEach((project) =>
    renderProjectItem(fragment, {
      ...project,
      isActive: activeId === project.id,
    }),
  );

  projectList.append(fragment);
  container.append(projectList);
  return projectList;
}

export function renderProjectItem(list, { id, name, isActive }) {
  const projectItem = makeElement('li', {
    class: 'project-item',
    attrs: {
      'data-id': id,
    },
    children: [
      makeElement('button', {
        class: `btn-text ${isActive ? 'active' : ''}`,
        text: name,
      }),
    ],
  });

  list.append(projectItem);
  return projectItem;
}
