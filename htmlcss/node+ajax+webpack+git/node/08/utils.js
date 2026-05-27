/* 
目标：基于ECMAScript标准语法，封装属性和方法,并"默认"导出给外部使用
*/

const baseURL = 'http://hmajax.itheima.net';
const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0);
// 默认导出属性和方法
export default {
    url: baseURL,
    arrSum: getArraySum
}