/* 

目标：基于ECMAScript标准语法，并”命名“导入工具属性和方法
*/

// 命名导入
import { baseURL, getArraySum } from './utils.js';
console.log(baseURL);
console.log(getArraySum([1, 2, 3, 6]));