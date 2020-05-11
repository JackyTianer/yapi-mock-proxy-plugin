const template = `
  <style>
    :host{
    }
    .project-list{
      border: 1px solid #efefef;
      margin-top: 20px;
      padding: 0 20px;
      text-align: left;
    }
    .project-list .list{
      list-style: none;
      padding:0;
    }
    .project-list .list .item{
      margin-bottom: 20px;
    }
    .project-list .list .item:after{
      content: '';
      display: block;
      clear: both;
    }
    .project-list .list .item .btn{
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      margin: 30px 0 0 20px;
      outline: 0;
      width: 40px;
    }
    .btn.btn-open{
      border: 1px solid #38ba71;
      color: white;
      background: #38ba71;
    }
    .btn.btn-open:hover{
      color: #38ba71;
      border: 1px solid #38ba71;
      background: white;
    }
    .btn.btn-delete{
      border: 1px solid #fe5042;
      color: white;
      background: #fe5042;
    }
    .btn.btn-delete:hover{
      border: 1px solid #fe5042;
      color: #fe5042;
      background: white;
    }
    .project-list .btn-wrap{
      text-align: center;
    }
    .project-list .add-btn{
      background: white;
      border:1px solid #106ecc;
      color: #106ecc;
      cursor: pointer;
      font-size: 16px;
      padding: 5px 0;
      text-align: center;
      width: 120px;
      }
    .project-list .add-btn:hover{
      background: #106ecc;
      color: white;
    }
  </style>
  <div class="project-list">
    <ul id="list" class="list"></ul>
    <div class="btn-wrap">
      <button id="btn" class="add-btn"></button>  
    </div>
  </div>
`;
export default template;