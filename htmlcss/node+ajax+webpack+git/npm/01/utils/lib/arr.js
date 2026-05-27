/* 
目标：封装数组常用的方法
*/

// 数组求和方法
const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0);
// 使用CommonJS标准语法导出属性和方法
module.exports = {
    getArraySum
};