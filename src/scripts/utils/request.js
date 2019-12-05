export default function (url, method) {
  return new Promise((resolve,reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method || 'GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 ) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
        } catch (e) {
          reject(xhr)
        }
      }
    };
    xhr.send();
  });
}