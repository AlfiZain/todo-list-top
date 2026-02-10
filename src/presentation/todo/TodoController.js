import { renderTodos } from './TodoView.js';

export function initTodo(service) {
  const container = document.getElementById('todo-list');
  if (!container) return;

  renderTodos(service.getAllTodo());
}
