import Base from '../Base';
import template from './CustomSwitch.template';

const EVENT = {
  CHANGE_OPEN_STATUS: 'c-changeOpenStatus'
};

class CustomSwitch extends Base{

  static get observedAttributes() {
    return ['open'];
  }

  constructor() {
    super();
  }

  config() {
    super.config();
    this.data = {
      open: false
    };
    this.ele = {
      switch: undefined
    };
    this.shadowRoot.innerHTML = template;
  }

  init() {
    super.init();
  }

  initData() {
    this.data.open = this.getAttribute('open') === 'true';

    this.ele.switch = this.shadowRoot.querySelector('.custom-switch');
  }

  initView() {
    this.setOpenValue(this.data.open);
  }

  initEvent() {
    this.ele.switch.addEventListener('click', () => {
      this.data.open = !this.data.open;
      this.setOpenValue(this.data.open);
      this.emit(EVENT.CHANGE_OPEN_STATUS, {
        open: this.data.open
      });
    });
  }

  setOpenValue(open) {
    if (open) {
      !!this.ele.switch && this.ele.switch.classList.add('switch-checked');
    } else {
      !!this.ele.switch && this.ele.switch.classList.remove('switch-checked');
    }
  }

  // 当自定义元素的一个属性被增加、移除或更改时被调用。:
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      this.data.open = newValue === 'true';
      this.setOpenValue(this.data.open);
    }
  }
}

customElements.define('custom-switch', CustomSwitch);

export {
  EVENT
};