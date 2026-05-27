/* 
目标1：验证码登录
1.1。在utils/request.js中配置axios请求基地值
1.2.收集手机号和验证码数据
1.3.基于axios调用验证码登录接口
1.4.使用bootstrap的Alert 警告框弹出反馈结果给到用户

*/

// 收集手机号和验证码数据
document.querySelector('.btn').addEventListener('click', function () {
    //1.2.收集手机号和验证码数据
    const loginForm = document.querySelector('.form_wrap');
    const loginData = serialize(loginForm, { hash: true, empty: true });
    console.log(loginData);
    if (loginData.mobile.length !== 11) {
        showAlert(false, '请输入正确的手机号');
        return;
    }
    if (loginData.code.length !== 6) {
        showAlert(false, '请输入正确的验证码');
        return;
    }
    //1.3.基于axios调用验证码登录接口
    axios({
        method: 'POST',
        url: '/v1_0/authorizations',
        data: loginData
    }).then(result => {
        showAlert(true, '登录成功');
        console.log(result);
        //1.2登录成功后，保存token令牌字符串到本地存储，并跳转到内容列表页面
        localStorage.setItem('token', result.data.token);
        setTimeout(() => {
            location.href = '../content/index.html'
        }, 2000);
    });

});