const allowedPriority = ['low', 'medium', 'high'];

function validateTitle(title) {
  if (typeof title !== 'string' || title.trim() === '') {
    throw new Error('Title is required');
  }
}

function validatePriority(priority) {
  if (!allowedPriority.includes(priority)) {
    throw new Error('Invalid priority');
  }
}

function validateDueDate(dueDate) {
  if (dueDate === undefined || dueDate === null) return;

  const date = new Date(dueDate);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid due date');
  }
}

export function validateCreateTodo(data) {
  validateTitle(data.title);
  if ('priority' in data) validatePriority(data.priority);
  if ('dueDate' in data) validateDueDate(data.dueDate);
}

export function validateUpdateTodo(data) {
  if ('title' in data) validateTitle(data.title);
  if ('priority' in data) validatePriority(data.priority);
  if ('dueDate' in data) validateDueDate(data.dueDate);
}
