import storage from './utils/storage2';

async function main() {
  const mainSwitch = await storage.get(('mainSwitch'));
  if(mainSwitch){
    // 在页面上插入注入拦截脚本
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', chrome.extension.getURL('scripts/proxyscript.js'));
    document.documentElement.appendChild(script);
    script.addEventListener('load', async() => {
      let localApiList = await storage.get('apiList');
      window.postMessage({
        action: 'yapi-mock-plugin-api_list',
        localApiList: localApiList || []
      });
    });
  }

}

main();

// window.onload = function () {
//   const meta = document.createElement('meta');
//   meta.setAttribute('http-equiv', 'Content-Security-Policy');
//   meta.setAttribute('content', 'default-src self * unsafe-inline');
//   document.head.appendChild(meta);
// };

