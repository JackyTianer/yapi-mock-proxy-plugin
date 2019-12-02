import Base from '../Base';
import template from './MiniProjectList.template';
import { EVENT as CustomSwitchEvent } from '../CustomSwitch/CustomSwitch';

const EVENT = {
  UPDATE_PROJECT_LIST: 'c-updateProjectList'
};

class MiniProjectList extends Base{

  static get observedAttributes() {
    return ['list'];
  }

  constructor() {
    super();
  }

  config() {
    this.data = {
      list: []
    };
    this.ele = {
      list: undefined
    };
    this.shadowRoot.innerHTML = template;
  }

  initData() {
    this.ele.list = this.shadowRoot.querySelector('#list');
  }

  initView() {
  }

  initEvent() {
  }

  // 当自定义元素与文档DOM断开连接时被调用。
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // 当自定义元素被移动到新文档时被调用。
  adoptedCallback() {
    super.adoptedCallback();
  }

  // 当自定义元素的一个属性被增加、移除或更改时被调用。:
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'list') {
      this.data.list = JSON.parse(newValue);
      this.renderItem();
    }
  }

  renderItem() {
    (() => {
      while (this.ele.list.firstChild) {
        this.ele.list.removeChild(this.ele.list.firstChild);
      }
    })();
    for (let item of this.data.list) {
      const liEle = document.createElement('li');
      liEle.setAttribute('class', 'item');
      const spanEle = document.createElement('span');
      spanEle.setAttribute('class', 'project-name');
      spanEle.setAttribute('title', !!item.projectDetail ? item.projectDetail.name : '');
      spanEle.innerText = !!item.projectDetail ? item.projectDetail.name : '';
      const switchEle = document.createElement('custom-switch');
      switchEle.setAttribute('class', `switch`);
      switchEle.setAttribute('open', `${item.enable}`);
      switchEle.addEventListener(CustomSwitchEvent.CHANGE_OPEN_STATUS, ({ detail }) => {
        item.enable = detail.open;
        this.emit(EVENT.UPDATE_PROJECT_LIST, {
          list: [...this.data.list]
        });
        this.renderItem();
      });
      liEle.appendChild(spanEle);
      liEle.appendChild(switchEle);
      this.ele.list.append(liEle);
    }
  }
}

customElements.define('mini-project-list', MiniProjectList);

export {
  EVENT
};