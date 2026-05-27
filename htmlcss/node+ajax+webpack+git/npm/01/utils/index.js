/* 
本文件是utils工具包唯一出口的文件
作用：把所有工具模块方法集中起来，统一向外暴露
*/

// 工具模块导入
const { checkUser, checkPwd } = require('./lib/str.js');
const { getArraySum } = require('./lib/arr.js');


// 统一向外导出
module.exports = {
    checkUser,
    checkPwd,
    getArraySum
}   