/* 
目标：基于fs模块读写文件内容
1.加载fs模块对象 
2.写入文件内容
3.读取文件内容
*/
// 1.加载fs模块对象 
const fs = require('fs');
// 2.写入文件内容
fs.writeFile('./text.txt', 'hello node.js', (err) => {
    if (err) console.log(err)
    else console.log('写入成功')
})
// 读取文件内容
fs.readFile('./text.txt', (err, data) => {
    if (err) console.log(err)
    else console.log(data.toString());// .toString()方法将Buffer类型的数据（16进制数据流对象）转换为字符串

})