/* 
目标：基于CommonJS标准语法，导入工具属性和方法
*/

const obj = require('./utils.js');
// 导入工具属性和方法
console.log(obj.url);
console.log(obj.arrSum([1, 2, 3]));// 6

