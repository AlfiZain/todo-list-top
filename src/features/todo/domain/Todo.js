export default class Todo {
  constructor({
    id,
    title,
    description = '',
    notes = '',
    dueDate = null,
    priority = 'low',
    projectId = '1',
    completed = false,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.notes = notes;
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.priority = priority;
    this.projectId = projectId;
    this.completed = completed;
  }
}
