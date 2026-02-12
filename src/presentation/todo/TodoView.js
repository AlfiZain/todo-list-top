import makeElement from '../../utils/makeElement.js';

export function renderTodoSection() {
  const container = document.getElementById('main-content');
  if (!container) return;

  const section = makeElement('section', {
    class: 'todo-section',
    children: [
      makeElement('ul', {
        id: 'todo-list',
        class: 'todo-list',
      }),
      makeElement('button', {
        id: 'add-todo-btn',
        class: 'btn-text',
        text: '+ Add Todo',
      }),
    ],
  });

  container.appendChild(section);
}

export function renderTodo({ id, title, priority, dueDate, completed }) {
  const todoList = document.querySelector('.todo-list');

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

  todoList.appendChild(todoItem);
}

export function renderTodos(todos) {
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = '';

  if (!Array.isArray(todos)) throw new Error('Todos must be an Array');
  if (todos.length === 0) renderEmptyTodo();

  todos.forEach((todo) => renderTodo(todo));
}

export function renderEmptyTodo() {
  const todoList = document.querySelector('.todo-list');

  const emptyTodo = makeElement('p', {
    class: 'todo-empty',
    text: 'No todos yet',
  });

  todoList.appendChild(emptyTodo);
}

export function updateTodoStatus(todo) {
  const todoItem = document.querySelector(`.todo-item[data-id="${todo.id}"]`);
  if (!todoItem) return;

  const checkbox = todoItem.querySelector('.todo-status');

  todoItem.classList.toggle('completed', todo.completed);
  checkbox.checked = todo.completed;
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
