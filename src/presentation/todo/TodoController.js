import { VIEW_MODE } from '../../constants/systemDefaults.js';

export function bindTodoEvents(container, { appState, service, renderPage }) {
  container.addEventListener('change', (e) => handleChangeCheckbox(e, service));
  container.addEventListener('click', (e) =>
    handleTodoClick(e, appState, renderPage),
  );
}

function handleChangeCheckbox(event, service) {
  const checkbox = event.target.closest('.todo-status');
  if (!checkbox) return;

  const todoItem = event.target.closest('.todo-item');
  if (!todoItem) return;

  const todoId = todoItem.dataset.id;
  const todo = service.toggleComplete(todoId);

  todoItem.classList.toggle('completed', todo.completed);
  checkbox.checked = todo.completed;
}

function handleTodoClick(event, appState, renderPage) {
  const todoTitle = event.target.closest('.todo-title');
  if (!todoTitle) return;

  const todoItem = event.target.closest('.todo-item');
  const todoId = todoItem.dataset.id;

  appState.activeTodoId = todoId;
  appState.viewMode = VIEW_MODE.TODO_DETAIL;

  renderPage();
}
