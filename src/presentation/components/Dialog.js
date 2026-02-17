import { makeElement } from '../../utils/makeElements.js';

export function createDialog(root) {
  const dialog = makeElement('dialog', { class: 'dialog' });

  const open = (content) => {
    dialog.innerHTML = '';
    dialog.append(content);
    root.append(dialog);
    dialog.showModal();
  };

  const close = () => {
    dialog.close();
    dialog.remove();
  };

  return { dialog, open, close };
}
