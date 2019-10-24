import storage from './utils/storage2';
// 在页面上插入代码
const script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', chrome.extension.getURL('scripts/proxyscript.js'));
document.documentElement.appendChild(script);
script.addEventListener('load', async() => {
  let localApiList = await storage.get('apiList');
  window.postMessage({
    action: 'yapi-mock-plugin-api_list',
    localApiList: localApiList
  });
});
