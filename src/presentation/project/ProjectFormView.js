import { makeElement, makeInputGroup } from '../../utils/makeElements.js';

export function renderProjectForm(modal, isCreate, project, controller) {
  const { projectController } = controller;
  const form = makeElement('form', { id: 'projectForm' });

  const nameInput = makeInputGroup(
    'Project Name',
    'name',
    'name',
    'text',
    project?.name,
    true,
  );

  const descriptionInput = makeInputGroup(
    'Project Description',
    'description',
    'description',
    'text',
    project?.description,
    false,
  );

  const cancelBtn = makeElement('button', {
    id: 'cancelProjectBtn',
    class: 'cancel-btn',
    text: 'Cancel',
    attrs: {
      type: 'button',
    },
  });

  const submitBtn = makeElement('button', {
    id: 'submitProjectBtn',
    class: isCreate ? 'create-btn' : 'update-btn',
    text: isCreate ? 'Create' : 'Update',
    attrs: {
      type: 'submit',
    },
  });

  form.append(nameInput, descriptionInput, cancelBtn, submitBtn);
  modal.open(form);

  cancelBtn.addEventListener('click', () => {
    projectController.cancelChanges();
    form.reset();
    modal.close();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);

    projectController.saveProject(formObj);
    form.reset();
    modal.close();
  });

  return form;
}
