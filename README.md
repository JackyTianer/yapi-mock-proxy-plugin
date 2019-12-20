# yapi-mock-plugin 

![](https://img.shields.io/github/package-json/v/JackyTianer/yapi-mock-chrome-plugin?color=%2394c220)

- [简体中文](README_CN.md)

## Screenshot

![image.png](./resources/images/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f383033323332342d316335623831343961626435316636652e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f.png)

![image.png](./resources/images/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f383033323332342d306336663866356235393163386638642e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f.png)


## Features
  - Interface forwarding can be implemented without modifying the code 
  - Automatic synchronization from the yapi, no need to write the interface again
  - Turn on/off at any time
  
## Install
### Download

You can download the source code and build it yourself, or download the built version from following links:

- [YAPI Mock Plugin Download Page  (GitHub release)](https://github.com/JackyTianer/yapi-mock-chrome-plugin/releases)

### Chrome Webstore
You can download crx file in chrome webstore; [link](https://chrome.google.com/webstore/detail/hmilbnjkdfelpikedbjhcdbpbjdfphnl)

## How to use
- After you install the plugin， click the settings button in the popup
- Input your server address like `https://yapi.test-host.net/`
- Find you project token at yapi, you can find it at the token configuration in the project
  ![image.png](./resources/images/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f383033323332342d636165623534343836643130333332382e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f.png)
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


