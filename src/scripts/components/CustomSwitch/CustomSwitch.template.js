const template = `
<style>
:host{

}
.custom-switch{
  background: rgba(0,0,0,0.25);
  border-radius: 100px;
  height: 20px;
  position: relative;
  width: 42px;
}
.custom-switch:after{
    position: absolute;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    background-color: #fff;
    border-radius: 18px;
    cursor: pointer;
    -webkit-transition: all .36s cubic-bezier(.78, .14, .15, .86);
    transition: all .36s cubic-bezier(.78, .14, .15, .86);
    content: ' ';
}
.custom-switch.switch-checked{
  background: #1890ff;
}
.custom-switch.switch-checked:after{
    left: 100%;
    margin-left: -1px;
    transform: translateX(-100%);
}
</style>
<div class="custom-switch">
</div>
`;
export default template;