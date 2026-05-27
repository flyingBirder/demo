/* 
目标：基于web服务，开发提供网页资源的功能
1.1 加载http模块创建web服务
1.2 使用req.url属性获取请求资源路径，并读取index.html文件字符串内容返回给请求方
1.3 其他路径，暂时返回‘不存在提示’
1.4 运行web服务，用浏览器发起请求
*/

const fs = require('fs');
const path = require('path');
//1.1 基于http模块，创建web服务
const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
    if (req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'dist/index.html'), (err, data) => {
            if (err) console.log(err);
            else {
                // 设置响应头，指定响应体内容类型为超文本字符串，让浏览器解析为html文档
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end(data.toString());
            }
        });
    } else {
        // 其他路径，暂时返回‘不存在’提示
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('你要访问的资源不存在');
    }


});
server.listen(8080, () => {
    console.log('web服务程序启动成功');
});