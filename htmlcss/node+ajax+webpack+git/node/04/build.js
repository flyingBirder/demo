/* 
目标：压缩html代码
需求：把回车符\r、换行符\n 压缩掉，只保留必要的代码,写入到新的文件中
1.1 读取源html文件内容
1.2 正则替换字符串
1.3 写入新的html文件中
*/
//1.1 读取源html文件内容
const fs = require('fs');
const path = require('path');
fs.readFile(path.join(__dirname, 'public/index.html'), (err, data) => {
    if (err) console.log(err);
    else {
        // console.log(data.toString());
        //1.2 正则替换字符串
        const htmlStr = data.toString().replace(/[\r\n]/g, '');
        console.log(htmlStr);
        //1.3 写入新的html文件中
        fs.writeFile(path.join(__dirname, 'dist/index.html'), htmlStr, err => {
            if (err) console.log(err)
            else console.log('压缩成功');
        })
    }
})
