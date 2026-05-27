
/* 
目标：在node.js环境的代码中，应该使用绝对路径来操作文件
原因：在node.js环境中，__dirname指向当前执行文件所在目录，而相对路径指向当前执行文件所在目录的上一级目录，而不是项目根目录。
*/

// 引入fs模块，用于操作文件系统
const fs = require('fs');
// 引入path模块，用于处理文件路径
const path = require('path');
console.log(__dirname); // ./ 03
// 调用path模块的join方法，配合__dirname变量拼接目标文件的绝对路径
fs.readFile(path.join(__dirname, '../text.txt'), (err, data) => {
    if (err) console.log(err)
    else console.log(data.toString());

})