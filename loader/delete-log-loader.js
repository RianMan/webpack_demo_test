const loaderUtils = require('loader-utils');

module.exports = function(content, map, meta) {
    let nextSource;
    let options = loaderUtils.getOptions(this);
    let { isDelete } = options;
    // 通过loaderUtils拿到对应的配置项，进行逻辑处理，当用户不想要删除日志的时候就不删除， 
    if(isDelete){
      nextSource = content.replace(/console.log\(.+\)/g,'');
      return nextSource;
    }else{
      return content;
    }
};