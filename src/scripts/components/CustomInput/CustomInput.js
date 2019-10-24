import Base from '../Base';
import template from './CustomInput.template';

class CustomInput extends Base{

  static get observedAttributes() {
    return ['value'];
  }

  constructor() {
    super();
  }

  config() {
    super.config();
    this.data = {
      value: undefined,
      validateRules: undefined,
      placeholder: undefined,
      lab: undefined
    };
    this.ele = {
      ipt: undefined,
      lab: undefined
    };
    this.shadowRoot.innerHTML = template;
  }

  init() {
    super.init();
  }

  initData() {
    this.data.value = this.getAttribute('value');
    this.data.lab = this.getAttribute('lab');
    this.data.validateRules = this.getAttribute('validate-rules');
    this.data.placeholder = this.getAttribute('placeholder');
    this.ele.ipt = this.shadowRoot.querySelector('.custom-input .ipt');
    this.ele.lab = this.shadowRoot.querySelector('.custom-input .lab');
  }

  initView() {
    this.setInputValue(this.data.value);
    this.setInputPlaceholder(this.data.placeholder);
    this.setLab(this.data.lab);
  }

  initEvent() {
    this.ele.ipt.addEventListener('input', (e) => {
      const event = new CustomEvent('c-change', {
        detail: {
          value: e.target.value
        }
      });
      this.dispatchEvent(event);
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
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'value') {
      this.setInputValue(newValue);
    }
  }

  setInputValue(value) {
    !!value && !!this.ele.ipt && this.ele.ipt.setAttribute('value', value);
  }

  setInputPlaceholder(value) {
    !!value && !!this.ele.ipt && this.ele.ipt.setAttribute('placeholder', value);
  }

  setLab(value) {
    !!value && !!this.ele.lab && (this.ele.lab.innerHTML = value);
  }
}

customElements.define('custom-input', CustomInput);
