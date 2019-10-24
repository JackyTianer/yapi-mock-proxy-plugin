const template = `
  <style>
    :host{
    }
    .custom-input{
      width: 100%;
    }
    .custom-input .lab{
      font-weight: bold;
    }
    .custom-input .ipt{
      box-sizing: border-box;
      width: 100%;
      padding: 10px 4px;
    }
    .custom-input .ipt:focus{
      border: 1px solid #5cadff;
      box-shadow: none;
      outline: 0;
    }
  </style>
  <div class="custom-input">
    <div class="lab"></div>
    <input class="ipt" type="text">
  </div>
`;
export default template;
