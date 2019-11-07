<div align="center">
  <h1>
    YAPI MOCK拦截插件
  </h1>


## Features
1. 通过拦截YAPI上定义的接口，无需修改任何代码 即可自动mock

2. 使用简单，是需要将YAPI项目设置中Token,配置的插件中即可
![image.png](https://upload-images.jianshu.io/upload_images/8032324-d4effcd5cf5254ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/8032324-3279e408feb2e718.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## Installation
1. Clone the repository `git clone https://github.com/JackyTianer/yapi-mock-chrome-plugin.git`
2. Run `npm install`
3. Run `npm run build`



##### Load the extension in Chrome & Opera
1. Open Chrome/Opera browser and navigate to chrome://extensions
2. Select "Developer Mode" and then click "Load unpacked extension..."
3. From the file browser, choose to `YAPI-mock-plugin/build/chrome` or (`YAPI-mock-plugin/build/opera`)


## Developing
The following tasks can be used when you want to start developing the extension and want to enable live reload - 

- `npm run chrome-watch`
- `npm run opera-watch`
- `npm run firefox-watch`


## Packaging
Run `npm run dist` to create a zipped, production-ready extension for each browser. You can then upload that to the appstore.


## TODO
- [ ] MOCK全局开以及项目开关功能


-----------
This project is licensed under the MIT license. 

If you have any questions or comments, please create a new issue. I'd be happy to hear your thoughts.


