import profilePicture from '../../assets/images/zain-avatar.webp';
import { makeElement } from '../../utils/makeElements.js';

export function createUserInfo(root) {
  const userInfo = makeElement('div', {
    children: [
      makeElement('div', {
        class: 'user-info',
        children: [
          makeElement('img', {
            class: 'profile-picture',
            attrs: { src: profilePicture, alt: 'zain picture' },
          }),
          makeElement('p', { class: 'name', text: 'Zain' }),
        ],
      }),
    ],
  });

  root.append(userInfo);
  return userInfo;
}
