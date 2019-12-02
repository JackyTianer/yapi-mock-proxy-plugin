import Base from '../Base';
import template from './ProjectList.template';

const EVENT = {
  UPDATE_PROJECT_LIST: 'c-updateProjectList'
};

class ProjectList extends Base{

  static get observedAttributes() {
    return ['list'];
  }

  constructor() {
    super();
  }

  config() {
    super.config();
    this.data = {
      list: []
    };
    this.ele = {
      list: undefined,
      btn: undefined
    };
    this.shadowRoot.innerHTML = template;
  }

  init() {
    super.init();
  }

  initData() {
    this.ele.btn = this.shadowRoot.querySelector('#btn');
    this.ele.list = this.shadowRoot.querySelector('#list');
  }

  initView() {
  }

  initEvent() {
    this.ele.btn.addEventListener('click', () => {
      this.data.list.push({
        enable: true,
        token: '',
        interfacePath: ''
      });
      this.emit(EVENT.UPDATE_PROJECT_LIST, {
        list: [...this.data.list]
      });
      this.renderItem();
    });
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

  getProjectList() {
    return this.data.list;
  }

  renderItem() {
    const removeList = () => {
      while (this.ele.list.firstChild) {
        this.ele.list.removeChild(this.ele.list.firstChild);
      }
    };

    const generateTokenIpt = (idx) => {
      let tokenIpt = document.createElement('custom-input');
      tokenIpt.setAttribute('value', this.data.list[idx].token);
      tokenIpt.setAttribute('style', 'float: left;width:300px');
      tokenIpt.setAttribute('lab', 'token:');
      tokenIpt.setAttribute('placeholder', '请从YAPI(项目/设置/token设置)获取token');
      tokenIpt.addEventListener('c-change', ({ detail }) => {
        this.data.list[idx].token = detail.value;
        this.emit(EVENT.UPDATE_PROJECT_LIST, {
          list: [...this.data.list]
        });
      });
      return tokenIpt;
    };

    const generateEnableBtn = (idx) => {
      let btn = document.createElement('button');
      btn.setAttribute('style', 'float:left');
      if (this.data.list[idx].enable) {
        btn.setAttribute('class', 'btn btn-close');
        btn.appendChild(document.createTextNode('关闭'));
      } else {
        btn.setAttribute('class', 'btn btn-open');
        btn.appendChild(document.createTextNode('开启'));
      }
      return btn;
    };
    const generateDeleteBtn = (idx) => {
      let btn = document.createElement('button');
      btn.setAttribute('style', 'float:left');
      btn.setAttribute('class', 'btn btn-delete');
      btn.appendChild(document.createTextNode('删除'));
      btn.addEventListener('click', () => {
        this.data.list.splice(idx, 1);
        this.emit(EVENT.UPDATE_PROJECT_LIST, { list: [...this.data.list] });
        this.renderItem();
      });
      return btn;
    };
    removeList();
    for (let i = 0; i < this.data.list.length; i++) {
      const li = document.createElement('li');
      li.setAttribute('class', 'item f-cb');
      li.appendChild(generateTokenIpt(i));
      // li.appendChild(generateEnableBtn(i));
      li.appendChild(generateDeleteBtn(i));
      this.ele.list.appendChild(li);
    }
  }
}

customElements.define('project-list', ProjectList);

export {
  EVENT
};