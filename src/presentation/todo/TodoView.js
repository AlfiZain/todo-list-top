import makeElement from '../../utils/makeElement.js';

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
