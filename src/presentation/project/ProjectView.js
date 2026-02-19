import { SYSTEM_PROJECTS } from '../../constants/systemDefaults.js';
import { makeElement } from '../../utils/makeElements.js';
import createDeleteButton from '../components/DeleteButton.js';
import createEditButton from '../components/EditButton.js';

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

  createEditButton(actions, () => controller.requestEdit(id));

  if (id !== SYSTEM_PROJECTS.DEFAULT_ID) {
    createDeleteButton(actions, () => controller.deleteProject(id));
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
