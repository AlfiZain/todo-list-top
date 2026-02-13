import makeElement from '../../utils/makeElement.js';

export function renderTodoSection(container) {
  const section = makeElement('section', {
    class: 'todo-section',
  });

  container.append(section);
  return section;
}

export function renderAddTodoBtn(container) {
  const addTodoBtn = makeElement('button', {
    id: 'add-todo-btn',
    class: 'btn-text',
    text: '+ Add Todo',
  });

  container.append(addTodoBtn);
  return addTodoBtn;
}

export function renderTodoList(container, todos) {
  if (!Array.isArray(todos)) throw new Error('Todos must be an Array');

  const todoList = makeElement('ul', {
    id: 'todo-list',
    class: 'todo-list',
  });

  const fragment = document.createDocumentFragment();

  if (todos.length === 0) renderEmptyTodo(fragment);
  todos.forEach((todo) => renderTodoItem(fragment, todo));

  todoList.append(fragment);
  container.append(todoList);
  return todoList;
}

export function renderEmptyTodo(list) {
  const emptyTodo = makeElement('li', {
    class: 'todo-empty',
    text: 'No todos yet',
  });

  list.append(emptyTodo);
  return emptyTodo;
}

export function renderTodoItem(
  list,
  { id, title, priority, dueDate, completed },
) {
  const todoItem = makeElement('li', {
    class: `todo-item ${completed ? 'completed' : ''}`,
    attrs: {
      'data-id': id,
    },
    children: [
      makeElement('input', {
        class: 'todo-status',
        attrs: {
          type: 'checkbox',
          checked: completed ?? false,
        },
      }),
      makeElement('h2', {
        class: 'todo-title',
        children: [
          makeElement('button', {
            class: 'btn-text',
            text: title,
          }),
        ],
      }),
      makeElement('span', {
        class: `todo-priority ${priority.toLowerCase()}`,
        text: priority,
      }),
      makeElement('span', {
        class: 'todo-due-date',
        text: dueDate,
      }),
    ],
  });

  list.append(todoItem);
  return todoItem;
}

export function renderTodoDetail(todo, project) {
  const container = document.getElementById('main-content');
  if (!container) return;

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
  container.appendChild(article);
}
