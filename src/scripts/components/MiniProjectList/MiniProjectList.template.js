const template = `
  <style>
    :host{
    
    }
    .mini-project-list{
      /*border: 1px solid #efefef;*/
      margin-top: 20px;
      max-height: 150px;
      overflow: auto;
      padding: 0;
      text-align: left;
    }
    .mini-project-list .item{
      justify-content: space-between;
      display: flex;
      flex-flow: row nowrap;
      list-style: none;
      margin-bottom: 10px;
      padding:0;
    }
    .item .switch{
      margin-left: 5px;
    }
    .item .project-name{
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 120px;
      height: 20px;
      white-space: nowrap;
    }
  </style>
  <ul id="list" class="mini-project-list">
    
  </ul>
`;
export default template;