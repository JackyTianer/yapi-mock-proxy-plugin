import ext from './utils/ext';
import storage from './utils/storage';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import './components/CustomInput/CustomInput';


const serverConfig = document.querySelector('#serverConfig');
serverConfig.addEventListener('c-change', ({ detail }) => {
  storage.set('server', detail.value);
});