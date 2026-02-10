import { SYSTEM_PROJECTS } from '../../../constants/systemDefaults.js';
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

  getAllProject() {
    return this.projectRepository.getAll() || [];
  }

  getProjectById(id) {
    return this.projectRepository.getById(id) || [];
  }

  initDefaultProject() {
    const existing = this.projectRepository.getById(SYSTEM_PROJECTS.DEFAULT_ID);
    if (existing) return existing;

    const project = new Project({
      id: SYSTEM_PROJECTS.DEFAULT_ID,
      name: SYSTEM_PROJECTS.DEFAULT_NAME,
      description: SYSTEM_PROJECTS.DEFAULT_DESCRIPTION,
    });

    this.projectRepository.create(project);

    return project;
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

  deleteProjectById(id) {
    const existing = this.projectRepository.getById(id);
    if (!existing) throw new Error('Project not found');

    this.projectRepository.deleteById(id);
  }

  deleteAllProject() {
    this.projectRepository.deleteAll();
  }
}
