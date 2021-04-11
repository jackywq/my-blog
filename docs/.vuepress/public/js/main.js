function init(){
    console.log("终于可以为所欲为了");
    // 如果你要操作元素的时候，由于该函数在head部分，所以可能会出现界面未加载就调用该js, 所以延迟处理js
}
//因为界面加载原因，我们延迟500ms再调用init
setTimeout("init()", 500)
