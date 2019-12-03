# yapi-mock-plugin 

-[简体中文](README_CN.md)

## Screenshot

![image.png](https://upload-images.jianshu.io/upload_images/8032324-1c5b8149abd51f6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)

![image.png](https://upload-images.jianshu.io/upload_images/8032324-0c6f8f5b591c8f8d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)


## Features
  - Interface forwarding can be implemented without modifying the code 
  - Automatic synchronization from the yapi, no need to write the interface again
  - Turn on/off at any time
  
## Install
### Download

You can download the source code and build it yourself, or download the built version from following links:

- [YAPI Mock Plugin Download Page  (GitHub release)](https://github.com/JackyTianer/yapi-mock-chrome-plugin/releases)

### Chrome Webstore
You can download crx file in chrome webstore; [link](https://chrome.google.com/webstore/detail/bkfkiepeojidkfpkbipbaigkpdjbnlmf)

## How to use
- After you install the plugin， click the settings button in the popup
- Input your server address like `https://yapi.test-host.net/`
- Find you project token at yapi, you can find it at the token configuration in the project
  ![image.png](https://upload-images.jianshu.io/upload_images/8032324-caeb54486d103328.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- Click the add project button and input you token on it
- Click the Sync Now button, and when the popup prompts success, you will be happy to mock.

## Run and Build

### Environment
 - Install [Node.js](https://nodejs.org/)
 - Change to the folder `./`, run `npm install` to install dependented libraries
    ```bash
    npm install
    ```
    
### Run    
  - Change to the folder `./`, run `npm run chrome-watch` to watch files change(If you use Firefox or another browser, run `npm run firefox-watch`)
  - Open Chrome/Opera browser and navigate to chrome://extensions 
  - Select "Developer Mode" and then click "Load unpacked extension..." 
  - From the file browser, choose to `YAPI-mock-plugin/build/chrome` or (`YAPI-mock-plugin/build/opera`)
  
### Developing
  The following tasks can be used when you want to start developing the extension and want to enable live reload - 
  - `npm run chrome-watch`
  - `npm run opera-watch`
  - `npm run firefox-watch`

### Packaging
  Run `npm run dist` to create a zipped, production-ready extension for each browser. You can then upload that to the appstore.


## Copyright
This project is licensed under the MIT license.

-----------
If you have any questions or comments, please create a new issue. I'd be happy to hear your thoughts.


