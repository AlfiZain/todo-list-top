export default function makeElement(
  tag,
  { id, class: className, text, children = [], attrs = {} } = {},
) {
  if (typeof tag !== 'string' || tag.trim() === '')
    throw new Error('Invalid tag name');

  const element = document.createElement(tag);

  if (id) element.id = id;
  if (className) element.className = className;
  if (text) element.textContent = text;

  for (const key in attrs) {
    if (!Object.hasOwn(attrs, key)) continue;

    const value = attrs[key];

    if (value === true) {
      element.setAttribute(key, '');
    } else if (value !== false && value != null) {
      element.setAttribute(key, value);
    }
  }

  children.forEach((child) => {
    element.appendChild(
      child instanceof Node ? child : document.createTextNode(child),
    );
  });

  return element;
}
