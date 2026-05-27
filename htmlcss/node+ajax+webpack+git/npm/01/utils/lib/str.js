/* 
目标：封装校验用户名和密码长度的方法
要求：用户名 最少8位，密码长度至少6位
*/
// 校验用户名长度
const checkUserName = userName => {
    return userName.length >= 8;
}
// 校验密码长度
const checkPassword = password => {
    return password.length >= 6;
}
// 导出校验用户名和密码长度的方法
module.exports = {
    checkUser: checkUserName,
    checkPwd: checkPassword
}