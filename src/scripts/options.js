import ext from './utils/ext';
import storage from './utils/storage2';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import './components/CustomInput/CustomInput';
import './components/ProjectList/ProjectList';


const serverConfig = document.querySelector('#serverConfig');
const btnSync = document.querySelector('#btnSync');
const tokenConfig = document.querySelector('#tokenConfig');

function initData() {
  storage.get('server')
    .then((server) => {
      !!server && serverConfig.setAttribute('value', server);
    });
  storage.get('projectList')
    .then((projectList) => {
      !!projectList && tokenConfig.setAttribute('list', JSON.stringify(projectList));
    });
}

function initEvent() {

// 数据请求回填
  serverConfig.addEventListener('c-change', ({ detail }) => {
    storage.set({
      server: detail.value
    });
  });
  tokenConfig.addEventListener('c-updateProjectList', ({ detail }) => {
    storage.set({
      projectList: detail.list
    });
  });

// 监听click
  btnSync.addEventListener('click', (event) => {
    ext.runtime.sendMessage({
      action: 'sync_api',
      to: 'background'
    }, (response) => {
      console.log(response);
    });
  });

  ext.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'sync_api_success' && request.to === 'options') {
      alert('同步成功');
    }
  });
}

initData();

initEvent();