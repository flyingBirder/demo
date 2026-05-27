/* 
目标：基于CommonJS标准语法，封装属性和方法并导出给外部使用
*/
// 封装属性和方法
// 基础URL
const baseURL = 'http://hmajax.itheima.net';
// 封装数组求和方法
const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0);

// 导出属性和方法
module.exports = {
    url: baseURL,
    arrSum: getArraySum
}