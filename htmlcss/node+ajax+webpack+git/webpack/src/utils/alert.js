// 弹窗插件
// 需要先准备alert样式相关的DOM
/* 
BS 的Alert 警告框函数， 2秒后消失
*/

// 命名导出
export function showAlert(isSuccess, msg) {
    const myAlert = document.querySelector('.alert');
    const bgStyle = isSuccess ? 'alert-success' : 'alert-danger';

    myAlert.classList.add('show');
    myAlert.innerText = msg;
    myAlert.classList.add(bgStyle);

    setTimeout(() => {
        myAlert.classList.remove(bgStyle);
        myAlert.classList.remove('show');
        myAlert.innerText = '';
    }, 1000);


}