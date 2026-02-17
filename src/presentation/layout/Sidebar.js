import { makeElement } from '../../utils/makeElements.js';

export function createSidebar(root) {
  const sidebar = makeElement('aside', {
    id: 'sidebar',
    class: 'sidebar',
  });

  root.append(sidebar);
  return sidebar;
}
