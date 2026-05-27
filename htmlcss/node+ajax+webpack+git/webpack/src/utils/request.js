// axios公共配置
import axios from 'axios';
// 基地值
axios.defaults.baseURL = 'http://geek.itheima.net';


//2.1添加axios请求拦截器--request
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 统一携带token令牌字符串在请求头上
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);

});

// 添加axios响应拦截器--response
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 优化：直接返回响应体数据，而不是整个响应对象
    const result = response.data;
    return result;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么;例如统一对401身份验证失败情况作处理
    if (error?.response?.status === 401) {
        alert('身份验证失败，请重新登录');
        // 清除本地存储的token
        localStorage.clear();
        // 跳转到登录页面
        location.href = '../login/index.html';
    }
    return Promise.reject(error);
});
export default axios;// 默认导出