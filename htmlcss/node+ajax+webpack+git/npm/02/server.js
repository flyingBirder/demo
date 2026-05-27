/* 
目标：使用npm 下载dayjs软件包来格式化日期时间
1.初始化清单文件：npm init -y (得到package.json文件，如已存在就忽略此步骤)
2.下载软件包到当前项目，得到node_modules文件夹。命令： npm i 软件包名
3.使用软件包
*/

const dayjs = require('dayjs');
const nowdate = dayjs().format('YYYY-MM-DD HH:mm:ss');
console.log(nowdate);
