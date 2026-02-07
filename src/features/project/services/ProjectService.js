import Project from '../domain/Project.js';
import {
  validateCreateProject,
  validateUpdateProject,
} from '../domain/ProjectValidator.js';

export default class ProjectService {
  constructor(projectRepository, idGenerator) {
    this.projectRepository = projectRepository;
    this.idGenerator = idGenerator;
  }

  createProject(data) {
    validateCreateProject(data);

    const project = new Project({
      ...data,
      id: this.idGenerator.generate(),
      name: data.name.trim(),
    });

    this.projectRepository.create(project);
    return project;
  }

  updateProject(data) {
    validateUpdateProject(data);

    const existing = this.projectRepository.getById(data.id);
    if (!existing) throw new Error('Project not found');

    const normalizeProject = new Project({
      id: existing.id,
      name: data.name?.trim() ?? existing.name,
      description: data.description ?? existing.description,
    });

    this.projectRepository.update(normalizeProject);
    return normalizeProject;
  }
}
