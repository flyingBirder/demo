// 封装检查手机号长度和验证码长度的函数 
export const checkPhone = phone => {
    return phone.length === 11;
}
export const checkCode = code => {
    return code.length === 6;
}