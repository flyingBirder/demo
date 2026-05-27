/* 
目标：安装所有依赖的软件包
场景：一般拿到别人的项目后，只有package.json文件，缺少node_modules时需要做的事
语法：在当前项目终端下，输入命令： npm i 
效果：会根据package.json记录的软件包和版本开始下载
*/
// 导入dayjs软件包
const dayjs = require('dayjs');
const dateStr = dayjs().format('YYYY-MM-DD HH:mm:ss');
console.log(dateStr);
// 导入lodash软件包
const lodash = require('lodash');
const sum = lodash.sum([1, 2, 3]);
console.log(sum);
console.log(lodash.max([11, 2, 3]));

