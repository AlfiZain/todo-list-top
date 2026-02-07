function validateName(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Name is required');
  }
}

export function validateCreateProject(data) {
  validateName(data.name);
}

export function validateUpdateProject(data) {
  if ('name' in data) validateName(data.name);
}
