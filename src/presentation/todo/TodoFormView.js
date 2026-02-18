import { SYSTEM_PROJECTS } from '../../constants/systemDefaults.js';
import {
  makeCheckboxGroup,
  makeElement,
  makeInputGroup,
  makeSelectGroup,
  makeTextareaGroup,
} from '../../utils/makeElements.js';

export function renderTodoForm(
  modal,
  isCreate,
  todo,
  activeProjectId,
  controller,
) {
  const { projectController, todoController } = controller;
  const projects = projectController.getAllProject();
  const form = makeElement('form', { id: 'todoForm' });

  const titleInput = makeInputGroup(
    'Task Title',
    'title',
    'title',
    'text',
    todo?.title,
    true,
  );

  const descriptionInput = makeInputGroup(
    'Short Description',
    'description',
    'description',
    'text',
    todo?.description,
    false,
  );

  const notesInput = makeTextareaGroup(
    'Detailed Notes',
    'notes',
    'notes',
    todo?.notes,
    false,
  );

  const dueDateInput = makeInputGroup(
    'Deadline',
    'dueDate',
    'dueDate',
    'date',
    todo?.dueDate,
    false,
  );

  const priorityInput = makeSelectGroup(
    'Priority Level',
    'priority',
    'priority',
    [
      {
        label: 'low',
        value: 'low',
      },
      {
        label: 'medium',
        value: 'medium',
      },
      {
        label: 'high',
        value: 'high',
      },
    ],
    todo?.priority ?? 'low',
    false,
  );

  const projectInput = makeSelectGroup(
    'Assign to Project',
    'project',
    'project',
    projects.map((project) => ({ label: project.name, value: project.id })),
    todo?.projectId ?? activeProjectId,
    false,
  );

  const statusInput = makeCheckboxGroup(
    'Mark as Completed',
    'status',
    'status',
    false,
  );

  const cancelBtn = makeElement('button', {
    id: 'cancelTodoBtn',
    class: 'cancel-btn',
    text: 'Cancel',
    attrs: {
      type: 'button',
    },
  });

  const submitBtn = makeElement('button', {
    id: 'submitTodoBtn',
    class: isCreate ? 'create-btn' : 'update-btn',
    text: isCreate ? 'Create' : 'Update',
    attrs: {
      type: 'submit',
    },
  });

  form.append(
    titleInput,
    descriptionInput,
    notesInput,
    dueDateInput,
    priorityInput,
    projectInput,
    statusInput,
    submitBtn,
    cancelBtn,
  );
  modal.open(form);

  cancelBtn.addEventListener('click', () => {
    todoController.cancelChanges();
    form.reset();
    modal.close();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formObj = {
      title: formData.get('title'),
      description: formData.get('description'),
      notes: formData.get('notes'),
      dueDate: formData.get('dueDate'),
      priority: formData.get('priority'),
      projectId: formData.get('project'),
      completed: formData.get('status'),
    };

    todoController.saveTodo(formObj);
    form.reset();
    modal.close();
  });

  return form;
}
