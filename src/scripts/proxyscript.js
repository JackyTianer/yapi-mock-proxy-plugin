let customAjax = {
  config: {
    apiList: [],
    projectIdBlacklist: []
  },
  originalXHR: window.XMLHttpRequest,
  myXHR: function () {
    const xhr = new customAjax.originalXHR();
    const originOpen = xhr.open;
    xhr.open = function (method, url) {
      let newUrl = '';
      for (let api of customAjax.config.apiList) {
        if (url.indexOf(api.path) !== -1 && method === api.method && !customAjax.config.projectIdBlacklist.includes(api.project_id)) {
          newUrl = api.mock_path;
          if (url.indexOf('?') !== -1) {
            newUrl += url.substr(url.indexOf('?'));
          }
        }
      }
      originOpen.call(xhr, method, newUrl);
    };
    return xhr;
  },

  originalFetch: window.fetch.bind(window),
  myFetch: function (req, config) {
    let url = '';
    let newUrl = '';
    let newRequest = req;
    if (!!window.Request && req instanceof window.Request) {
      url = req.url;
      for (let api of customAjax.config.apiList) {
        if (url.indexOf(api.path) !== -1 && req.method === api.method && !customAjax.config.projectIdBlacklist.includes(api.project_id)) {
          newUrl = api.mock_path;
          if (url.indexOf('?') !== -1) {
            newUrl += url.substr(url.indexOf('?'));
          }
          newRequest = new window.Request(newUrl, {
            method: req.method,
            headers: req.header,
            body: req.body,
            mode: req.mode,
            credentials: req.credentials,
            cache: req.cache,
            redirect: req.redirect,
            referrer: req.referrer,
            integrity: req.integrity
          });
        }
      }
    } else {
      url = req;

      config = Object.assign({}, config);
      config.method = config.method || 'GET';
      for (let api of customAjax.config.apiList) {
        if (url.indexOf(api.path) !== -1 && config.method === api.method && !customAjax.config.projectIdBlacklist.includes(api.project_id)) {
          newRequest = api.mock_path;
          if (url.indexOf('?') !== -1) {
            newRequest += url.substr(url.indexOf('?'));
          }
        }
      }
    }
    return customAjax.originalFetch(newRequest, config);
  }
};
window.addEventListener('message', function (event) {
  const data = event.data;
  if (data.action === 'yapi-mock-plugin-api_list') {
    customAjax.config.apiList = data.localApiList;
    customAjax.config.projectIdBlacklist = data.projectIdBlacklist;
    window.XMLHttpRequest = customAjax.myXHR;
    window.fetch = customAjax.myFetch;
  }
}, false);