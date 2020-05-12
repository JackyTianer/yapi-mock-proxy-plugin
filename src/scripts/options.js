import ext from './utils/ext';
import storage from './utils/storage2';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import './components/CustomInput/CustomInput';
import { EVENT } from './components/ProjectList/ProjectList';


const serverConfig = document.querySelector('#serverConfig');
const btnSync = document.querySelector('#btnSync');
const tokenConfig = document.querySelector('#tokenConfig');

async function initData() {
  const server = await storage.get('server');
  !!server && serverConfig.setAttribute('value', server);
  const projectList = await storage.get('projectList');
  !!projectList && tokenConfig.setAttribute('list', JSON.stringify(projectList));
}

function initEvent() {

// 数据请求回填
  serverConfig.addEventListener('c-change', ({ detail }) => {
    storage.set({
      server: detail.value
    });
  });
  tokenConfig.addEventListener(EVENT.UPDATE_PROJECT_LIST, async({ detail }) => {
    // 获取项目基本信息
    const server = await storage.get('server');
    storage.set({
      projectList: detail.list
    });
  });

// 监听click
  btnSync.addEventListener('click', (event) => {
    ext.runtime.sendMessage({
      action: 'sync_api',
      to: 'background'
    });
  });

  ext.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'sync_api_success' && request.to === 'options') {
      alert('同步成功');
      console.table(request.data);
    }
    if (request.action === 'sync_api_fail' && request.to === 'options') {
      alert(request.data);
    }
    if(request.to === 'background'){
      ext.runtime.sendMessage(request);
    }
  });
}

function initI18n() {
  document.title = chrome.i18n.getMessage('settings');
  document.querySelector('.option-tip').innerText = chrome.i18n.getMessage('optionTip');
  document.querySelector('.btn-sync').innerText = chrome.i18n.getMessage('syncInterface');
  serverConfig.setAttribute('lab', chrome.i18n.getMessage('server'));
  serverConfig.setAttribute('placeholder', chrome.i18n.getMessage('serverTip'));

}

initData();
initEvent();
initI18n();