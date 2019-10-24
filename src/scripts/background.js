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
  for (let i = 0; i < projectList.length; i++) {
    const response = await ajax(`${server}/api/interface/list?token=${projectList[i].token}`);
    for (let api of response.data.list) {
      // api.mockJSON = await ajax(`${server}/mock/${api.project_id}${api.path}`, api.method);
      api.mockPath = `${server}/mock/${api.project_id}${api.path}`;
    }
    apiList = [...apiList, ...response.data.list];
  }
  storage.set({
    apiList: apiList
  });
};