/* 
目标：基于ECMAScript标准语法，"默认"导入工具属性和方法
*/

import obj from './utils.js';
// 默认导入
console.log(obj.url);
console.log(obj.arrSum([1, 2, 3, 6]));