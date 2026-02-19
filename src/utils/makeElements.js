export function makeElement(
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

export function makeInputGroup(
  label,
  id,
  name,
  type = 'text',
  value = '',
  isRequired = false,
) {
  const inputGroup = makeElement('div', {
    class: 'input-group',
    children: [
      makeElement('label', {
        text: label,
        attrs: {
          for: id,
        },
      }),
      makeElement('input', {
        id,
        attrs: {
          type,
          name,
          value: value ?? '',
          required: isRequired,
        },
      }),
    ],
  });

  return inputGroup;
}

export function makeTextareaGroup(
  label,
  id,
  name,
  value = '',
  isRequired = false,
) {
  const textAreaGroup = makeElement('div', {
    class: 'input-group',
    children: [
      makeElement('label', {
        text: label,
        attrs: {
          for: id,
        },
      }),
      makeElement('textarea', {
        id,
        text: value ?? '',
        attrs: {
          name,
          required: isRequired,
        },
      }),
    ],
  });

  return textAreaGroup;
}

export function makeSelectGroup(
  label,
  id,
  name,
  options = [],
  selectedValue = '',
  isRequired = false,
) {
  const select = makeElement('select', {
    id,
    attrs: {
      name,
      required: isRequired,
    },
  });

  options.forEach((opt) => {
    const option = makeElement('option', {
      text: opt.label,
      attrs: {
        value: opt.value,
      },
    });

    select.appendChild(option);
  });

  if (selectedValue) {
    select.value = selectedValue;
  }

  return makeElement('div', {
    class: 'input-group',
    children: [
      makeElement('label', {
        text: label,
        attrs: { for: id },
      }),
      select,
    ],
  });
}

export function makeCheckboxGroup(
  label,
  id,
  name,
  checked = false,
  isRequired = false,
) {
  return makeElement('div', {
    class: 'input-group checkbox-group',
    children: [
      makeElement('label', {
        attrs: { for: id },
        children: [
          makeElement('input', {
            id,
            attrs: {
              type: 'checkbox',
              name,
              checked,
              required: isRequired,
            },
          }),
          ` ${label}`,
        ],
      }),
    ],
  });
}
