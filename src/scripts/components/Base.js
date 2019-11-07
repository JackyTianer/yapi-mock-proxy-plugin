class Base extends HTMLElement{
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.config();
  }

  // 子类重写
  config() {
  }

  //当自定义元素第一次被连接到文档DOM时被调用。
  connectedCallback() {
    this.init();
  }

  // 子类重写
  init() {
    this.initData();
    this.initView();
    this.initEvent();
  }

  initData() {
  }

  initView() {
  }

  initEvent() {
  }

  // 当自定义元素与文档DOM断开连接时被调用。
  disconnectedCallback() {
    this.destroy();
  }

  // 子类重写
  destroy() {
  }

  // 当自定义元素被移动到新文档时被调用。
  adoptedCallback() {

  }

  // 当自定义元素的一个属性被增加、移除或更改时被调用。:
  attributeChangedCallback() {
  }

  emit(eventName, detail) {
    const event = new CustomEvent(eventName, {
      detail: detail
    });
    this.dispatchEvent(event);
  }
}

export default Base;
