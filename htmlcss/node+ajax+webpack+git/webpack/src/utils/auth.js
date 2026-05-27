import axios from '@/utils/request.js';

// 权限插件 （引入到了除了登录页面以外的所有页面）
/* 
目标1:访问权限控制
1.1在utils/auth.js中判断无token令牌字符串,则强制跳转到登录页面
1.2登录成功后，保存token令牌字符串到本地存储，并跳转到内容列表页面
*/


//1.1判断无token令牌字符串,则强制跳转到登录页面
const token = localStorage.getItem('token');
if (!token) {
    location.href = '../login/index.html'
}


/* 
目标2:设置个人信息
2.1 在utils/request.js中设置请求拦截器，统一携带token令牌字符串在请求头上
2.2 请求个人信息并设置在页面
*/


// 2.2 请求个人信息并设置在页面
axios({
    url: '/v1_0/user/profile',
}).then(res => {
    // console.log(res);
    // const { name } = res.data;
    document.querySelector('.nickname').innerHTML = res.data.name;
})

/* 
目标3:退出登录
3.1 在utils/auth.js中添加退出登录按钮的点击事件
3.2 点击退出登录按钮，清空本地存储的token令牌字符串，并跳转到登录页面
*/
// 3.1 绑定点击事件
document.querySelector('.quick').addEventListener('click', () => {
    // 3.2 点击退出登录按钮，删除本地存储的token令牌字符串，并跳转到登录页面
    localStorage.clear();
    location.href = '../login/index.html'
})
