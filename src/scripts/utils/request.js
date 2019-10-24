export default function (url, method) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method || 'GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var resp = JSON.parse(xhr.responseText);
        resolve(resp);
      }
    };
    xhr.send();
  });
}