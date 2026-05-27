/* 
目标：导入utils软件包，使用里面封装的工具函数
*/

// 导入utils软件包
const obj = require('./utils');
console.log(obj);
// 调用工具函数
console.log(obj.getArraySum([1, 2, 3]));// 6
