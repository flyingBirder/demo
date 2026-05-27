/* 
目标1：体验webpack打包的过程
*/
// 1.1 准备项目和源代码
// 引入check.js文件
import { checkPhone, checkCode } from '../utils/check.js';
console.log(checkCode('123456'));
console.log(checkPhone('13800000000'));
// 1.2准备webpack打包环境
// 1.3 运行自定义命令打包观察效果 （npm run build）

/* 
目标2:修改webpack打包的入口和出口
2.1 在项目根目录下创建webpack.config.js配置文件
2.2 导出配置对象，配置入口文件和出口文件路径
2.3 运行自定义命令打包观察效果 （npm run build）
*/

/* 
目标3:用户登录-长度判断
3.1 准备用户登录页面
3.2 编写核心JS代码
3.3 打包并手动复制网页到dist下，引入打包后的JS文件，运行。
*/

// document.querySelector('.btn-login').addEventListener('click', () => {
//     const phone = document.querySelector('.login-form [name="mobile"]').value;
//     const code = document.querySelector('.login-form [name="code"]').value;
//     if (!checkPhone(phone)) {
//         document.querySelector('.info-box').innerHTML = '请输入正确的手机号';
//         return;
//     }
//     if (!checkCode(code)) {
//         document.querySelector('.info-box').innerHTML = '请输入正确的验证码';
//         return;
//     }
//     document.querySelector('.info-box').innerHTML = '登录成功';

// })

/* 
目标4：使用html-webpack-plugin插件，自动创建html文件，引入打包后的JS文件。
1.下载html-webpack-plugin本地软件包
2.配置webpack.config.js文件让webpack拥有插件功能。
3.重新打包观察效果。
*/

/* 
目标5:打包css代码
5.1 准备css代码，引入到js文件中
5.2 下载css-loader 和 style-loader 本地软件包
5.3 配置webpack.config.js文件，让webpack拥有处理css文件的能力
5.4 重新打包观察效果
*/

// 在终端输入命令 npm i bootstrap，下载bootstrap软件包， 引入bootstrap.min.css文件
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

/* 
目标6:优化css代码
步骤：
1.下载mini-css-extract-plugin本地软件包
2.配置webpack.config.js让webpack拥有该插件的功能
3.打包后 观察效果
*/
/* 
目标7:优化css代码压缩
1.下载css-minimizer-webpack-plugin本地软件包
2.配置webpack.config.js让webpack拥有此功能
3.打包重新观察
*/

/* 
目标8:打包less代码
0.准备less代码，引入到js文件中
1.下载less-loader 本地软件包
2.配置webpack.config.js让webpack拥有处理less文件的能力
3.打包后 观察效果
*/
import './index.less'

/* 目标9:打包图片代码
 9.1 创建assets文件夹，存放图片资源
 9.2 引入图片资源，观察打包效果
 9.3 配置webpack.config.js让webpack拥有处理图片文件的能力
 9.4 打包后 观察效果
*/
// 注意：js中引入本地资源要用import语句引入 （如果是网络图片http地址，直接用字符串引入）
import imgObj from './assets/logo.jpeg';
const theImg = document.createElement('img');
theImg.src = imgObj;
document.querySelector('.login-form').appendChild(theImg);

/* 目标10：完成登录功能
10.1: 使用npm 下载axios本地软件包（npm i axios）    体验npm 作用在前端项目中
10.2：准备并修改utils工具包中源代码导出实现函数
10.3: 导入并编写逻辑代码，打包后观察效果

*/
import myAxios from '../utils/request.js';
import { showAlert } from '../utils/alert.js';

document.querySelector('.btn-login').addEventListener('click', () => {
    const phone = document.querySelector('.login-form [name="mobile"]').value;
    const code = document.querySelector('.login-form [name="code"]').value;
    if (!checkPhone(phone)) {
        showAlert(false, '手机号的长度必须是11位数字');
        return;
    }
    if (!checkCode(code)) {
        showAlert(false, '验证码的长度必须是6位数字');
        return;
    }
    myAxios({
        url: '/v1_0/authorizations',
        method: 'post',
        data: {
            mobile: phone,
            code: code
        },

    }).then(() => {
        showAlert(true, '登录成功');
        // 登录成功后，跳转到content.html
        // 1. 登录成功后，将token保存到localStorage中
        localStorage.setItem('token', res.data.token);
        // 2. 跳转到content.html
        window.location.href = '../content/index.html';
    }).catch(error => {
        showAlert(false, error.response.data.message);

    });
});
/* 
目标11：体验webpack-dev-server插件
11.1 下载webpack-dev-server本地软件包（npm i webpack-dev-server）
11.2 设置模式为开发模式，并且在package.json文件中配置自定义命令。
11.3 使用npm run dev 来启动开发服务器，试试热更新效果。
注意：webpack-dev-server借助http模块创建8080端口的web服务
注意2: 默认以public文件夹作为服务器根目录，
注意3: webpack-dev-server 根据配置文件，打包相关代码到内存中，以output.path路径作为服务器根目录.（所以可以自己拼接访问dist目录下的文件。）

*/
console.log('hello webpack-dev-server');
/* 
目标12:打包模式
*/

/* 
目标13:打包模式下的应用：webpack模式下区分两种模式的区别
开发模式： style-loader 处理css代码，把css代码嵌入到js文件中。让热更替更快。
生产模式： css-loader 处理css代码，把css代码提取到独立的文件中。让css代码更小，加载更快更快。让浏览器缓存和并行下载js和css文件。
13.1: 下载cross-env 本地软件包（npm i cross-env --save-dev）
13.2: 配置package.json文件，让cross-env 帮助我们切换模式。配置自定义命令，传入参数名和值到process-env对象上（cross-env NODE_ENV=development），因为他是node.js环境变量，所以需要在命令行中输入。
13.3:在webpack.config.js文件中，根据process.env.NODE_ENV 来判断当前模式，设置不同的配置。
13.4: 打包后 观察效果。
*/

/* 目标14:前端注入环境变量
需求：前端项目代码中，开发环境下打印语句生效，生产环境下不生效。
步骤：
14.1: 在webpack.config.js文件中，使用DefinePlugin 插件，定义NODE_ENV环境变量。
14.2: 在前端代码中，使用NODE_ENV环境变量，来判断当前模式。
14.3: 打包后 观察效果。


*/
if (process.env.NODE_ENV === 'production') {
    console.log = function () { }
}
console.log('开发环境下打印语句生效，生产环境下不生效。');
/* 
目标15:source-map 资源地图功能：调试代码
需求：在浏览器中调试代码时，能够查看到原始代码的行号和列号。
解决： 使用webpack 的source-map ，开启资源地图功能。
步骤：
15.1: 在webpack.config.js文件中，配置devtool选项和值开启资源地图功能。（注意只适用于开发模式）
15.2: 代码中错误，并在开发环境下打包后 观察效果。

*/
consolee.log('hello source-map');

/* 目标16:路径解析 别名设置
作用：前端代码引入路径更加简单
16.1: 在webpack.config.js文件中，配置resolve.alias选项，指定模块的查找路径。
16.2: 在前端代码中，使用@名来引入模块。
16.3: 打包后 观察效果。

*/
import Axios from '@/utils/request.js';

console.log(Axios);
/* 
目标17:第三方库使用CDN加载引入
17.1: 在html文件中，引入第三方库的CDN地址。并用模版语法判断当前模式。
17.2: 配置webpack.config.js文件中externals外部扩展选项（防止某些import语句打包到js文件中）。
17.3: 两种模式下打包观察效果。
*/


/* 
目标18:多页面打包
需求：一个项目中，有多个页面，每个页面都有自己的html文件和js文件。
步骤：
18.1:准备源码（html、css、js）放入相应位置，并改用模块语法导出。
18.2:下载form-serialize包并引到核心代码中
18.3:配置webpack.config.js多入口和多页面的设置
18.4:重新打包观察结果

*/