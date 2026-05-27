/* 
 目标：基于ECMAScript标准语法，封装属性和方法,并"命名"导出给外部使用
*/
export const baseURL = 'http://hmajax.itheima.net';
export const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0);
