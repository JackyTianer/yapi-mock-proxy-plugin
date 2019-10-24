import ext from './utils/ext';
import ajax from './utils/request';
import storage from './utils/storage2';

let localApiList, server;
storage.get('apiList').then((data) => {
  debugger;
  localApiList = data;
});
storage.get('server').then((data) => {
  debugger;
  server = data;
});
const syncApi = async() => {
  const projectList = await storage.get('projectList');
  const server = await storage.get('server');
  let apiList = [];
  for (let i = 0; i < projectList.length; i++) {
    const response = await ajax(`${server}/api/interface/list?token=${projectList[i].token}`);
    // for (let api of response.data.list) {
    //   api.mockJSON = await ajax(`${server}/mock/${api.project_id}${api.path}`, api.method);
    // }
    apiList = [...apiList, ...response.data.list];
  }
  storage.set({
    apiList: apiList
  });
};
ext.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
    if (request.action === 'perform-save') {
      console.log('Extension Type: ', '/* @echo extension */');
      console.log('PERFORM AJAX', request.data);

    }
    if (request.action === 'sync_api') {
      sendResponse({ action: 'saved' });
      syncApi();
    }
  }
);
ext.webRequest.onBeforeRequest.addListener(function (info) {
  if (!!localApiList && !!server) {
    for (let api of localApiList) {
      if (info.url.indexOf(api.path) !== -1 && info.url.indexOf(server) === -1) {
        const urlParamArray = info.url.split('?');
        let redirectUrl = `${server}/mock/${api.project_id}${api.path}`;
        if (urlParamArray.length > 1) {
          redirectUrl += `?${urlParamArray[1]}`;
        }
        debugger;
        // const redirectUrl = `data:application/json;${JSON.stringify(api.mockJSON)}`;
        return { redirectUrl: redirectUrl };
        // return {
        //   cancel: true
        // };
      }
    }
  }
}, { urls: ['<all_urls>'] }, ['blocking']);