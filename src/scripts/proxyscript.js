let customAjax = {
  config: {
    apiList: []
  },
  originalXHR: window.XMLHttpRequest,
  myXHR: function () {
    const xhr = new customAjax.originalXHR();
    const originOpen = xhr.open;
    xhr.open = function (method, url) {
      for (let api of customAjax.config.apiList) {
        if (url.indexOf(api.path) !== -1 && method === api.method) {
          url = api.mockPath;
        }
      }
      originOpen.call(xhr, method, url);
    };
    return xhr;
  },

  originalFetch: window.fetch.bind(window),
  myFetch: function (url, config) {
    for (let api of customAjax.config.apiList) {
      if (url.indexOf(api.path) !== -1 && config.method === api.method) {
        url = api.mockPath;
      }
    }
    return customAjax.originalFetch(url, config);
  }
};
window.addEventListener('message', function (event) {
  const data = event.data;
  console.log(data);
  if (data.action === 'yapi-mock-plugin-api_list') {
    customAjax.config.apiList = data.localApiList;
    window.XMLHttpRequest = customAjax.myXHR;
    window.fetch = customAjax.myFetch;
  }
  // if (customAjax.settings.ajaxInterceptor_switchOn) {
  //   window.XMLHttpRequest = customAjax.myXHR;
  //   window.fetch = customAjax.myFetch;
  // } else {
  //   window.XMLHttpRequest = customAjax.originalXHR;
  //   window.fetch = customAjax.originalFetch;
  // }
}, false);