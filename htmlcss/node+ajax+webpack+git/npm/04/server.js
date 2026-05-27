/* 
目标：使用nodemon全局软件包，检测文件变化，自动重启程序
语法：
1.安装nodemon全局软件包，命令：npm i nodemon -g
2.使用nodemon执行目标js文件，命令：nodemon 目标js文件名
体验效果：启动web服务程序后，修改server.js文件，会自动重启程序
*/

const dayjs = require('dayjs');
const dateStr = dayjs().format('YYYY-MM-DD HH:mm:ss');
console.log(dateStr);
const _ = require('lodash');
console.log(_.max([11, 23, 35, 66]));
console.log(_.min([11, 23, 35, 66]));

