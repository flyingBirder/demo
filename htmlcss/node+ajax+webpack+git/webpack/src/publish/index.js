import '@/utils/auth.js';
import './index.css'
import axios from '@/utils/request.js'
import editor from '@/utils/editor.js'
import { myAlert } from '@/utils/alert.js'
import serialize from 'form-serialize'
/* 
目标1：设置频道下拉菜单
1.1 获取频道列表数据
1.2 渲染频道列表到下拉菜单
*/

// 1.1 获取频道列表数据
async function getChannelList() {
    const res = await axios({
        url: '/v1_0/channels'
    });
    // console.log(res);
    // 1.2 渲染频道列表到下拉菜单
    const channelList = res.data.channels;
    // 1.2.1 遍历频道列表
    const htmlStr = `<option value="">请选择文章频道</option>` + channelList.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
    // 1.2.2 渲染到下拉菜单
    document.querySelector('.channel-select').innerHTML = htmlStr;
}
// 1.2.3 网页运行后，默认调用函数
getChannelList();


/* 
目标2: 设置封面
2.1 准备标签结构和样式
2.2 选择文件并保存在formData对象中
2.3 单独上传图片并得到图片URL网址
2.4 回显并切换img标签展示（隐藏+上传标签）
注意：图片地址临时存储在img标签上，并未和文章关联保存
*/
// 2.2 选择文件并保存在formData对象中
document.querySelector('.img-file').addEventListener('change', async e => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('image', file);
    // 2.3 单独上传图片并得到图片URL网址
    const res = await axios({
        url: '/v1_0/image',
        method: 'POST',
        data: formData
    });
    console.log(res);
    // 2.4 回显并切换img标签展示（隐藏+上传标签）
    document.querySelector('.rounded').src = res.data.url;
    document.querySelector('.rounded').classList.add('show');
    document.querySelector('.place').classList.add('hide');
});
// 优化 点击img标签 可以重新切换封面
// 思路：点击img =》用js方式触发文件选择元素click事件方法
document.querySelector('.rounded').addEventListener('click', e => {
    document.querySelector('.img-file').click();
});

/* 
目标3：发布文章
3.1 基于form-serialize插件收集表单数据对象
3.2 基于axios调用发布文章接口，传递表单数据对象，提交到服务器保存
3.3 调用Alert弹窗插件，提示发布结果
3.4 发布成功后，重置表单并跳转到内容列表页面
*/

document.querySelector('.send').addEventListener('click', async (e) => {
    // 3.0 点击发布按钮后，先判断是否为发布按钮
    if (e.target.innerText !== '发布') return;
    // 3.1 基于form-serialize插件收集表单数据对象
    const form = document.querySelector('.art-form');
    const formData = serialize(form, { empty: true, hash: true });
    // 手动手机封面图片的URL网址到formData对象中
    formData.cover = {
        type: 1,// 封面类型，1为单图，2为多图
        images: [document.querySelector('.rounded').src] // 封面图片的URL网址
    };
    console.log(formData);

    // try...catch 捕获异常 处理发布文章接口可能抛出的异常
    try {
        // 3.2 基于axios调用发布文章接口，传递表单数据对象，提交到服务器保存
        const res = await axios({
            url: '/v1_0/mp/articles',
            method: 'POST',
            data: formData
        });
        console.log(res);
        // 3.3 调用Alert弹窗插件，提示发布结果
        showAlert(true, '发布成功');
        // 3.4 发布成功后，重置表单并跳转到内容列表页面
        form.reset();
        // 封面需要手动重置
        document.querySelector('.rounded').src = '';
        document.querySelector('.rounded').classList.remove('show');
        document.querySelector('.place').classList.remove('hide');
        // 富文本编辑器也需要手动重置
        editor.setHTML('');

        // 3.4.1 等待2秒后，跳转到内容列表页面
        setTimeout(() => {
            location.href = '../content/index.html'
        }, 2000);

    } catch (error) {
        // 3.3 调用Alert弹窗插件，提示发布结果
        showAlert(false, error.response.data.message);

    }

});

/* 目标4: 编辑文章
4.1 页面跳转传参 URL查询参数
4.2 发布文章页面接受参数判断
4.3 修改标题和按钮文字
4.4 获取文章详情数据并回显表单
*/
; (function () {
    // 4.2 发布文章页面接受参数判断
    const paramStr = location.search;
    const params = new URLSearchParams(paramStr);
    params.forEach(async (value, key) => {
        // console.log(value, key);
        if (key === 'id') {
            // 4.3 修改标题和按钮文字
            document.querySelector('div.titles').innerHTML = '修改文章';
            document.querySelector('.send').innerText = '修改';
            // 4.4 获取文章详情数据并回显表单

            const res = await axios({
                url: `/v1_0/mp/articles/${value}`
            });
            const dataObj = {
                channel_id: res.data.channel_id,
                title: res.data.title,
                rounded: res.data.cover.images[0],// 封面图片的URL网址
                content: res.data.content,
                id: res.data.id
            }
            // console.log(dataObj);
            // 便利数据对象属性，映射到页面元素上，快速赋值
            Object.keys(dataObj).forEach(key => {
                if (key === 'rounded') {
                    if (dataObj[key]) {
                        // 4.4.1 回显封面图片
                        document.querySelector('.rounded').src = dataObj[key];
                        document.querySelector('.rounded').classList.add('show');
                        document.querySelector(`.place`).classList.add('hide');
                    }
                } else if (key === 'content') {
                    // 4.4.1 回显富文本编辑器内容
                    editor.setHtml(dataObj[key]);
                } else {

                    // 4.4.2 用数据对象属性名，作为标签name属性选择器来找到匹配的标签，回显其他表单元素内容
                    document.querySelector(`[name="${key}"]`).value = dataObj[key];

                }
            })

        }
    });

})()


/* 目标5 编辑-保存文章
5.1 判断按钮文字是否为修改，不是则返回
5.2 调用编辑文章接口，保存信息到服务器。基于form-serialize插件收集表单数据对象
5.3 调用Alert弹窗插件，提示修改结果
5.4 修改成功后，重置表单并跳转到内容列表页面
*/
document.querySelector('.send').addEventListener('click', async (e) => {
    // 5.0 点击修改按钮后，先判断是否为修改按钮
    if (e.target.innerText !== '修改') return;
    // 
    const form = document.querySelector('.art-form');
    const formData = serialize(form, { hash: true, empty: true });
    // 捕获异常 处理编辑文章接口可能抛出的异常
    try {
        // 5.2 调用编辑文章接口，保存信息到服务器。
        const res = await axios({
            url: `/v1_0/mp/articles/${formData.id}`,
            method: 'PUT',
            data: {
                ...formData,
                cover: {
                    type: document.querySelector('.rounded').src ? 1 : 0,// 封面类型，1为单图，2为多图
                    images: [document.querySelector('.rounded').src] // 封面图片的URL网址
                }

            }
        });
        // 5.3 调用Alert弹窗插件，提示修改结果
        showAlert(true, '修改成功');

        setTimeout(() => {
            location.href = '../content/index.html'
        }, 2000);

    } catch (error) {
        // 5.3 调用Alert弹窗插件，提示修改结果
        showAlert(false, error.response.data.message);

    }

});