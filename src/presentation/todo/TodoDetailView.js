import { format } from 'date-fns';
import { makeElement } from '../../utils/makeElements.js';
import createEditButton from '../components/EditButton.js';
import createDeleteButton from '../components/DeleteButton.js';

export function renderTodoDetail(root, todo, project, controller) {
  const formattedDate = format(todo.dueDate, 'dd MMMM yyyy');
  let status;

  if (todo.completed) {
    status = 'Completed';
  } else if (todo.dueDate && controller.isOverdue(todo.dueDate)) {
    status = 'Overdue';
  } else if (todo.dueDate && !controller.isOverdue(todo.dueDate)) {
    status = 'Pending';
  } else {
    status = 'None';
  }

  const article = makeElement('article', {
    id: 'todo-detail',
    class: 'todo-detail',
  });

  const title = makeElement('h1', {
    class: 'todo-title',
    text: todo.title,
  });

  const actions = makeElement('div', {
    class: 'todo-actions',
  });

  const desc = makeElement('p', {
    class: 'todo-description',
    text: todo.description,
  });

  const header = makeElement('header', {
    class: 'todo-header',
    children: [title, actions],
  });

  createEditButton(actions, () => controller.requestEdit(todo.id));

  createDeleteButton(actions, () => controller.deleteTodo(todo.id));

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
            todo.dueDate
              ? makeElement('time', {
                  attrs: { datetime: todo.dueDate },
                  text: formattedDate,
                })
              : 'NONE',
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

  article.append(
    header,
    todo.description ? desc : '',
    metaSection,
    notesSection,
  );
  root.appendChild(article);
}
