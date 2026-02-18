import { SYSTEM_PROJECTS } from '../../constants/systemDefaults.js';
import { makeElement } from '../../utils/makeElements.js';

const EDIT_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
</svg>`;

const DELETE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
</svg>`;

export function renderActiveProjectSection(container, project, controller) {
  const { id, name, description = '' } = project;

  const section = makeElement('section', {
    class: 'project-section',
    attrs: { 'data-id': id },
  });

  const title = makeElement('h1', {
    class: 'project-title',
    text: name,
  });

  const header = makeElement('div', {
    class: 'project-header',
    children: [title],
  });

  const desc = makeElement('p', {
    class: 'project-description',
    text: description,
  });

  const actions = makeElement('div', {
    class: 'project-actions',
  });

  const editBtn = makeElement('button', {
    class: 'btn-edit btn-text',
  });
  editBtn.innerHTML = EDIT_ICON;
  editBtn.addEventListener('click', () => controller.requestEdit(id));

  actions.append(editBtn);

  if (id !== SYSTEM_PROJECTS.DEFAULT_ID) {
    const deleteBtn = makeElement('button', {
      class: 'btn-delete btn-text',
    });

    deleteBtn.innerHTML = DELETE_ICON;
    deleteBtn.addEventListener('click', () => controller.deleteProject(id));

    actions.append(deleteBtn);
  }

  header.append(actions);
  section.append(header, desc);
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

export function renderAddProjectBtn(container, controller) {
  const addProjectBtn = makeElement('button', {
    id: 'add-project-btn',
    class: 'btn-text',
    text: '+ Add Project',
  });

  addProjectBtn.addEventListener('click', controller.requestCreate);
  container.append(addProjectBtn);

  return addProjectBtn;
}

export function renderProjectList(container, projects, activeId, controller) {
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

  projectList.addEventListener('click', (e) =>
    handleProjectClick(e, controller),
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

function handleProjectClick(event, controller) {
  const projectItem = event.target.closest('.project-item');
  if (!projectItem) return;

  const buttons = document.querySelectorAll('.project-list .btn-text');
  buttons.forEach((button) => button.classList.remove('active'));

  const button = event.target.closest('.btn-text');
  button.classList.add('active');
  const projectId = projectItem.dataset.id;

  controller.openProject(projectId);
}
