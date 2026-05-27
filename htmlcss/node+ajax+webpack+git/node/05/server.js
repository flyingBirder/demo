/* 

目标：基于http模块创建web服务程序
1.1 加载http模块，创建web服务对象
1.2 监听request请求事件，设置响应头和响应体
1.3 配置端口号并启动web服务
1.4 浏览器请求 http://localhost:3000 测试
 */

//1.1 加载http模块，创建web服务对象
const http = require('http');
const server = http.createServer();
//1.2 监听request请求事件，设置响应头和响应体
server.on('request', (req, res) => {
    // 设置响应头，指定响应体内容为文本格式，字符集为utf-8
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    // 设置响应体内容，结束响应
    res.end('欢迎使用node.js和http模块创建web服务程序');
});
//1.3 配置端口号并启动web服务
server.listen(3000, () => {
    console.log('web服务程序启动成功');
});
