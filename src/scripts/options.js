import ext from './utils/ext';
import storage from './utils/storage';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import './components/CustomInput/CustomInput';
import './components/ProjectList/ProjectList';


const serverConfig = document.querySelector('#serverConfig');
const btnSync = document.querySelector('#btnSync');
const tokenConfig = document.querySelector('#tokenConfig');

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

btnSync.addEventListener('click', (event) => {
  ext.runtime.sendMessage({
    action: 'sync_api'
  }, (response) => {
    console.log(response);
  });
});

storage.get('server', function (resp) {
  serverConfig.setAttribute('value', resp.server);
});
storage.get('projectList', function (resp) {
  tokenConfig.setAttribute('list', JSON.stringify(resp.projectList));
});