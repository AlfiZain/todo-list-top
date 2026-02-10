import { renderTodos, updateTodoStatus } from './TodoView.js';

export function initTodo(service) {
  const container = document.getElementById('todo-list');
  if (!container) return;

  renderTodos(service.getAllTodo());

  container.addEventListener('change', (e) => handleChangeCheckbox(e, service));
}

function handleChangeCheckbox(event, service) {
  if (!event.target.classList.contains('todo-status')) return;

  const todoItem = event.target.closest('.todo-item');
  if (!todoItem) return;

  const todoId = todoItem.dataset.id;

  const newTodo = service.toggleComplete(todoId);
  updateTodoStatus(newTodo);
}
