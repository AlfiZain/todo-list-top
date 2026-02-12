import { VIEW_MODE } from '../../constants/systemDefaults.js';
import { updateTodoStatus } from './TodoView.js';

export function bindTodoEvents(service, appState, rerender) {
  const container = document.getElementById('todo-list');
  if (!container) return;

  container.addEventListener('change', (e) => handleChangeCheckbox(e, service));
  container.addEventListener('click', (e) =>
    handleTodoClick(e, appState, rerender),
  );
}

function handleChangeCheckbox(event, service) {
  if (!event.target.classList.contains('todo-status')) return;

  const todoItem = event.target.closest('.todo-item');
  if (!todoItem) return;

  const todoId = todoItem.dataset.id;

  const newTodo = service.toggleComplete(todoId);
  updateTodoStatus(newTodo);
}

function handleTodoClick(event, appState, rerender) {
  const todoTitle = event.target.closest('.todo-title');
  if (!todoTitle) return;

  const todoItem = event.target.closest('.todo-item');
  const todoId = todoItem.dataset.id;

  appState.activeTodoId = todoId;
  appState.viewMode = VIEW_MODE.TODO_DETAIL;

  console.log({ appState });

  rerender();
}
