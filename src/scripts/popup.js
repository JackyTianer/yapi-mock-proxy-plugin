import ext from './utils/ext';
import storage from './utils/storage2';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import { EVENT } from './components/CustomSwitch/CustomSwitch';

const optionsLink = document.querySelector('.js-options');
const mainSwitchElement = document.querySelector('#mainSwitch');
async function initData() {
  let mainSwitch = await storage.get('mainSwitch');
  debugger;
  mainSwitch = mainSwitch || false;
  mainSwitchElement.setAttribute('open', `${mainSwitch}`);
}

function initEvent() {
  optionsLink.addEventListener('click', function (e) {
    e.preventDefault();
    ext.tabs.create({ 'url': ext.extension.getURL('options.html') });
  });
  mainSwitchElement.addEventListener(EVENT.CHANGE_OPEN_STATUS, ({detail})=>{
    debugger;
    storage.set({
      mainSwitch: detail.open
    });
  })
}

initData();
initEvent();

