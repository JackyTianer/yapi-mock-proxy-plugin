import ext from './utils/ext';
import storage from './utils/storage2';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import { EVENT } from './components/CustomSwitch/CustomSwitch';
import { EVENT as miniProjectListEvent } from './components/MiniProjectList/MiniProjectList';

const optionsLink = document.querySelector('.js-options');
const mainSwitchElement = document.querySelector('#mainSwitch');
const projectListElement = document.querySelector('#miniProjectList');

async function initData() {
  let mainSwitch = await storage.get('mainSwitch');
  mainSwitch = mainSwitch || false;
  mainSwitchElement.setAttribute('open', `${mainSwitch}`);
  let projectList = await storage.get('projectList');
  projectListElement.setAttribute('list', JSON.stringify(projectList));
}

function initEvent() {
  optionsLink.addEventListener('click', function (e) {
    e.preventDefault();
    ext.tabs.create({ 'url': ext.extension.getURL('options.html') });
  });
  mainSwitchElement.addEventListener(EVENT.CHANGE_OPEN_STATUS, ({ detail }) => {
    storage.set({
      mainSwitch: detail.open
    });
    ext.runtime.sendMessage({
      action: 'update_storage_main_switch',
      to: 'background'
    });
  });
  projectListElement.addEventListener(miniProjectListEvent.UPDATE_PROJECT_LIST, ({ detail }) => {
    storage.set({
      projectList: detail.list
    });
    ext.runtime.sendMessage({
      action: 'update_storage_project_list',
      to: 'background'
    });
  });
}
function initI18n(){
  document.querySelector('.app-name').innerText = chrome.i18n.getMessage("popupTip");
  document.querySelector('.ctrl-name').innerText = chrome.i18n.getMessage("mainSwitch");
  document.querySelector('.js-options').innerText = chrome.i18n.getMessage("setting");
}
initData();
initI18n();
initEvent();

