import Project from '../domain/Project.js';

export default class ProjectRepository {
  constructor(storage) {
    this.storage = storage;
    this.key = 'project';
  }

  getAll() {
    const raw = this.storage.load(this.key) || [];
    return raw.map((data) => new Project(data));
  }

  getById(id) {
    const projects = this.getAll();
    return projects.find((project) => project.id === id);
  }

  create(project) {
    const projects = this.getAll();
    projects.push(project);
    this.storage.save(this.key, projects);
    return project;
  }

  update(project) {
    const projects = this.getAll();
    const newProjects = projects.map((item) =>
      item.id === project.id ? project : item,
    );
    this.storage.save(this.key, newProjects);
  }

  deleteById(id) {
    const projects = this.getAll();
    const filteredProjects = projects.filter((item) => item.id !== id);
    this.storage.save(this.key, filteredProjects);
  }

  deleteAll() {
    this.storage.save(this.key, '');
  }
}
