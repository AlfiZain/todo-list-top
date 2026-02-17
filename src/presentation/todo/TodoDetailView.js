import { makeElement } from '../../utils/makeElements.js';

export function renderTodoDetail(root, todo, project) {
  const status = todo.completed ? 'Completed' : 'Pending';

  const article = makeElement('article', {
    id: 'todo-detail',
    class: 'todo-detail',
  });

  const header = makeElement('header', {
    class: 'todo-header',
    children: [
      makeElement('h1', {
        class: 'todo-title',
        text: todo.title,
      }),
      makeElement('p', {
        class: 'todo-description',
        text: todo.description,
      }),
    ],
  });

  const metaItem = (label, valueNode) =>
    makeElement('div', {
      class: 'meta-item',
      children: [makeElement('dt', { text: label }), valueNode],
    });

  const metaList = makeElement('dl', {
    class: 'meta-list',
    children: [
      metaItem(
        'Priority',
        makeElement('dd', {
          class: `priority ${todo.priority.toLowerCase()}`,
          text: todo.priority.toUpperCase(),
        }),
      ),
      metaItem('Project', makeElement('dd', { text: project.name })),
      metaItem(
        'Status',
        makeElement('dd', {
          class: `status ${status.toLowerCase()}`,
          text: status.toUpperCase(),
        }),
      ),
      metaItem(
        'Due date',
        makeElement('dd', {
          children: [
            makeElement('time', {
              attrs: { datetime: todo.dueDate },
              text: todo.dueDate,
            }),
          ],
        }),
      ),
    ],
  });

  const metaSection = makeElement('section', {
    class: 'todo-meta',
    children: [metaList],
  });

  const notesSection = makeElement('section', {
    class: 'todo-notes',
    children: [
      makeElement('h2', { text: 'Notes' }),
      makeElement('p', { text: todo.notes }),
    ],
  });

  article.append(header, metaSection, notesSection);
  root.appendChild(article);
}
