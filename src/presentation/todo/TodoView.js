import { formatDistanceToNow } from 'date-fns';
import { makeElement } from '../../utils/makeElements.js';

export function renderTodoSection(container) {
  const section = makeElement('section', {
    class: 'todo-section',
  });

  container.append(section);
  return section;
}

export function renderAddTodoBtn(container, controller) {
  const addTodoBtn = makeElement('button', {
    id: 'add-todo-btn',
    class: 'btn-text',
    text: '+ Add Todo',
  });

  addTodoBtn.addEventListener('click', controller.requestCreate);
  container.append(addTodoBtn);

  return addTodoBtn;
}

export function renderTodoList(container, todos, controller) {
  if (!Array.isArray(todos)) throw new Error('Todos must be an Array');

  const todoList = makeElement('ul', {
    id: 'todo-list',
    class: 'todo-list',
  });

  const fragment = document.createDocumentFragment();

  if (todos.length === 0) renderEmptyTodo(fragment);
  todos.forEach((todo) => renderTodoItem(fragment, todo));

  todoList.addEventListener('change', (e) => handleStatusChange(e, controller));
  todoList.addEventListener('click', (e) => handleTitleClick(e, controller));
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
  const formattedDate = dueDate
    ? formatDistanceToNow(dueDate, { addSuffix: true })
    : 'NONE';

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
        text: formattedDate,
      }),
    ],
  });

  list.append(todoItem);
  return todoItem;
}

function handleStatusChange(event, controller) {
  const checkbox = event.target.closest('.todo-status');
  if (!checkbox) return;

  const todoItem = event.target.closest('.todo-item');
  if (!todoItem) return;

  const todoId = todoItem.dataset.id;
  const updated = controller.toggleComplete(todoId);

  todoItem.classList.toggle('completed', updated.completed);
  checkbox.checked = updated.completed;
}

function handleTitleClick(event, controller) {
  const todoTitle = event.target.closest('.todo-title');
  if (!todoTitle) return;

  const todoItem = event.target.closest('.todo-item');
  const todoId = todoItem.dataset.id;
  controller.openDetail(todoId);
}
