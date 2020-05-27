import ext from './utils/ext';
import ajax from './utils/request';
import storage from './utils/storage2';

const getProjectIdBlacklist = (projectList = []) => {
  let projectIdBlacklist = [];
  for (let item of projectList) {
    if (!item.enable && !!item.projectDetail) {
      projectIdBlacklist.push(item.projectDetail._id);
    }
  }
  return projectIdBlacklist;
};

const syncApi = async() => {
  const projectList = await storage.get('projectList');
  let server = await storage.get('server');
  if (server[server.length - 1] === '/') {
    server = server.slice(0, server.length - 1);
  }
  let apiList = [];
  try {
    for (let project of projectList) {
      // 先获取project相关信息
      const projectDtlResp = await ajax(`${server}/api/project/get?token=${project.token}`);
      project.projectDetail = projectDtlResp.data;
      const response = await ajax(`${server}/api/interface/list?token=${project.token}&limit=999999`);
      for (let api of response.data.list) {
        // api.mockJSON = await ajax(`${server}/mock/${api.project_id}${api.path}`, api.method);
        api.mock_path = `${server}/mock/${api.project_id}${api.path}`;
      }
      apiList = [...apiList, ...response.data.list];
    }
    await storage.set({
      projectList: projectList
    });
    await storage.set({
      apiList: apiList
    });
    ext.runtime.sendMessage({ action: 'sync_api_success', to: 'options', data: apiList });
    return {
      projectList,
      apiList
    };
  } catch (e) {
    ext.runtime.sendMessage({
      action: 'sync_api_fail',
      to: 'options',
      data: '同步失败，请确认serve以及token是否正确'
    });
  }
};

const addListener = async() => {
  let mainSwitch = await storage.get(('mainSwitch'));
  let projectList = await storage.get('projectList');
  let localApiList = await storage.get('apiList');
  let projectIdBlacklist = getProjectIdBlacklist(projectList);

  function addMessageListener() {
    ext.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
      if (request.action === 'sync_api' && request.to === 'background') {
        sendResponse({ action: 'sync_api_ing' });
        const result = await syncApi(sender.tab.id);
        // 更新本地数据
        projectList = result.projectList;
        localApiList = result.apiList;
        projectIdBlacklist = getProjectIdBlacklist(projectList);
        return;
      }
      if (request.action === 'update_storage_main_switch' && request.to === 'background') {
        mainSwitch = request.data.mainSwitch;
        return;
      }
    });
  };

  function addRequestListener() {
    ext.webRequest.onBeforeRequest.addListener((request) => {
      if (mainSwitch) {
        let url = request.url;
        let method = request.method;
        let newUrl = '';
        // isRedirect = gooDB.getIsRedirect();
        for (let api of localApiList) {
          if (url.indexOf(api.path) !== -1 && method === api.method && !projectIdBlacklist.includes(api.project_id)) {
            newUrl = api.mock_path;
            if (url.indexOf('?') !== -1) {
              newUrl += url.substr(url.indexOf('?'));
            }
          }
        }
        if (!!newUrl) {
          return {
            redirectUrl: newUrl
          };
        }
      }
      return {};
    }, {
      urls: ['<all_urls>']
    }, [
      'blocking'
    ]);
  }

  addMessageListener();
  addRequestListener();
};
addListener();


