class MyPlugin{
    constructor(){}
    apply(compiler){
        compiler.hooks.emit.tapAsync('emit',(compilation,callback)=>{
            console.log(compilation.assets,'-=-==-=-=');
            let content = "## 输出文件夹 \r\r"
            for (const key in compilation.assets) {
                content += `-- ${key} \r\r`;
            }
            compilation.assets['filelist.md'] = {
                source(){
                    return content;
                },
                size(){
                    return Buffer.byteLength(content)
                }
            }
            callback();
        })
    }
}
module.exports = MyPlugin;