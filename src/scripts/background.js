import ext from './utils/ext';
import ajax from './utils/request';
import storage from './utils/storage2';


let localApiList, server;
storage.get('apiList').then((data) => {
  localApiList = data;
});

storage.get('server').then((data) => {
  server = data;
});

const syncApi = async() => {
  const projectList = await storage.get('projectList');
  const server = await storage.get('server');
  let apiList = [];
  for (let project of projectList) {
    const response = await ajax(`${server}/api/interface/list?token=${project.token}`);
    for (let api of response.data.list) {
      // api.mockJSON = await ajax(`${server}/mock/${api.project_id}${api.path}`, api.method);
      api.mock_path = `${server}/mock/${api.project_id}${api.path}`;
      api.project_enable = project.enable;
    }
    apiList = [...apiList, ...response.data.list];
  }
  storage.set({
    apiList: apiList
  });
  ext.runtime.sendMessage({
    action: 'sync_api_success',
    to: 'options'
  });
};

ext.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // debugger;
  if (request.action === 'sync_api' && request.to === 'background') {
    sendResponse({ action: 'sync_api_ing' });
    syncApi();
  }
});