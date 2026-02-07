import Todo from '../domain/Todo.js';
import {
  validateCreateTodo,
  validateUpdateTodo,
} from '../domain/TodoValidator.js';

export default class TodoService {
  constructor(todoRepository, projectRepository, idGenerator) {
    this.todoRepository = todoRepository;
    this.projectRepository = projectRepository;
    this.idGenerator = idGenerator;
  }

  createTodo(data) {
    validateCreateTodo(data);

    const project = this.projectRepository.getById(data.projectId);
    if (!project) {
      throw new Error('Project is not found');
    }

    const todo = new Todo({
      ...data,
      id: this.idGenerator.generate(),
      title: data.title.trim(),
    });

    this.todoRepository.create(todo);
    return todo;
  }

  updateTodo(data) {
    validateUpdateTodo(data);

    const existing = this.todoRepository.getById(data.id);
    if (!existing) throw new Error('Todo not found');

    const projectId = data.projectId ?? existing.projectId;

    const project = this.projectRepository.getById(projectId);
    if (!project) {
      throw new Error('Project is not found');
    }

    const normalizeTodo = new Todo({
      id: existing.id,
      title: data.title?.trim() ?? existing.title,
      description: data.description ?? existing.description,
      notes: data.notes ?? existing.notes,
      dueDate: 'dueDate' in data ? data.dueDate : existing.dueDate,
      priority: data.priority ?? existing.priority,
      projectId,
      completed: data.completed ?? existing.completed,
    });

    this.todoRepository.update(normalizeTodo);
    return normalizeTodo;
  }

  toggleComplete(id) {
    const todo = this.todoRepository.getById(id);
    if (!todo) throw new Error('Todo not found');

    const updated = new Todo({
      ...todo,
      completed: !todo.completed,
    });

    this.todoRepository.update(updated);
    return updated;
  }
}
