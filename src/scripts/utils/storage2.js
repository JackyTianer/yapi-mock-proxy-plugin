import storage from './storage';


export default {
  get(key) {
    return new Promise((resolve) => {
      storage.get(key, (resp) => {
        resolve(resp[key]);
      });
    });
  },
  set(obj) {
    return new Promise((resolve => {
      storage.set(obj, () => {
        resolve();
      });
    }));
  }
};