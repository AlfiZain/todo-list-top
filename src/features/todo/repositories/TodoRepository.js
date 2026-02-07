import Todo from '../domain/Todo.js';

export default class TodoRepository {
  constructor(storage) {
    this.storage = storage;
    this.key = 'todos';
  }

  getAll() {
    const raw = this.storage.load(this.key) || [];
    return raw.map((data) => new Todo(data));
  }

  getById(id) {
    const todos = this.getAll();
    return todos.find((todo) => todo.id === id);
  }

  create(todo) {
    const todos = this.getAll();
    todos.push(todo);
    this.storage.save(this.key, todos);
    return todo;
  }

  update(todo) {
    const todos = this.getAll();
    const newTodos = todos.map((item) => (item.id === todo.id ? todo : item));
    this.storage.save(this.key, newTodos);
  }

  delete(id) {
    const todos = this.getAll();
    const filteredTodos = todos.filter((item) => item.id !== id);
    this.storage.save(this.key, filteredTodos);
  }
}
