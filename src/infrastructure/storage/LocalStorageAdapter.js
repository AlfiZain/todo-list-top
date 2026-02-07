import Storage from './Storage';

export default class LocalStorageAdapter extends Storage {
  load(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  save(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
  }
}
