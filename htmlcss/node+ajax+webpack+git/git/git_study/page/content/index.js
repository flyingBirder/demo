/* 
目标1：获取文章列表并展示
1.1 准备查询参数对象
1.2 获取文章列表数据
1.3 展示到指定的标签结构中

*/

// 1.1 准备查询参数对象
const queryObj = {
    status: '', // 文章状态 1待审核 2 审核通过 空字符串表示全部
    channel_id: '', // 文章频道id 空字符串表示全部
    page: 1, // 页码,
    per_page: 2, // 每页数据条数

};
let totalCount = 0;
async function getArticleList() {
    // 1.2 获取文章列表数据
    const res = await axios({
        url: '/v1_0/mp/articles',
        // method: 'GET',
        params: queryObj
    });
    // 3.1 保存并展示总条数
    totalCount = res.data.total_count;
    document.querySelector('.total-count').innerHTML = `共${totalCount}条`;


    // 1.3 展示到指定的标签结构中
    const htmlStr = res.data.results.map(item => `
    <tr>
    <td><img src="${item.cover.type === 0 ? `http://img2.baidu.com/u=2640406343,1419332367&amp;fmt=auto&amp;f=JPEG?w=708&amp;h=500` : item.cover.images[0]}" width="100" height="100" alt="" ></td>
    <td>${item.title}</td>
    <td>${item.status === 1 ? `<span class="badge text-badge-primary">待审核</span>` : `<span class="badge text-badge-success">审核通过</span>`}</td>
    <td><span>${item.pubdate}</span></td>
    <td><span>${item.read_count}</span></td>
    <td><span>${item.comment_count}</span></td>
    <td><span>${item.like_count}</span></td>
    <td data-id="${item.id}">
        <i class="bi bi-pencil-square edit">编辑</i>
        <i class="bi bi-trash3 del">删除</i>
    </td>
    </tr>
    `).join('');
    document.querySelector('.art-list').innerHTML = htmlStr;
}
getArticleList();

/* 
目标2:筛选文章列表
2.1 设置频道列表数据
2.2 监听筛选条件改变，保存查询信息到查询参数对象中
2.3 点击筛选时，传递查询参数对象到服务器
2.4 获取匹配数据，显示在页面
*/

//2.1 设置频道列表数据

async function setChannelList() {
    const res = await axios({
        url: '/v1_0/channels',
    });
    const htmlStr = `<option value="">请选择文章频道</option>` + res.data.channels.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
    document.querySelector('.form-select').innerHTML = htmlStr;

}
setChannelList();

// 2.2 监听筛选条件改变，保存查询信息到查询参数对象中
document.querySelectorAll('.form-check-input').forEach(radio => {
    radio.addEventListener('change', function (e) {
        queryObj.status = e.target.value;
        console.log(e.target.value)
    });
});
document.querySelector('.form-select').addEventListener('change', function (e) {
    queryObj.channel_id = e.target.value;
});
// 2.3 点击筛选时，传递查询参数对象到服务器

document.querySelector('.sel-btn').addEventListener('click', function () {
    //2.4 获取匹配数据，显示在页面 
    getArticleList();
})


/* 
目标3：分页展示文章列表
3.1 保存并设置总页数
3.2 点击下一页，做临界值判断，并切换页码参数，刷新数据
3.3 点击上一页，做临界值判断，并切换页码参数，刷新数据
*/
// 3.2监听下一页点击事件
document.querySelector('.next').addEventListener('click', function () {
    // 当前页码小于总页数/每页数据条数时，才能点击下一页
    if (queryObj.page < Math.ceil(totalCount / queryObj.per_page)) {
        queryObj.page++;
        document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`;
        getArticleList();
    }
})
// 3.3监听上一页点击事件
document.querySelector('.last').addEventListener('click', function () {
    // 当前页码大于1时，才能点击上一页
    if (queryObj.page > 1) {
        queryObj.page--;
        document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`;
        getArticleList();
    }
})
/* 目标4：删除文章
4.1 关联文章ID到删除按钮
4.2 点击删除按钮时，获取当前按钮所在行的文章ID
4.3 调用删除接口，传递文章ID
4.4 重新获取文章列表数据
4.5 删除最后一页的最后一条数据，需要自动向前翻页
*/
// 4.2 点击删除按钮时，获取当前按钮所在行的文章ID
document.querySelector('.art-list').addEventListener('click', async function (e) {
    // 判断点击的是删除元素
    if (e.target.classList.contains('del')) {
        const articleId = e.target.parentNode.dataset.id;
        // 4.3 调用删除接口，传递文章ID
        const res = await axios({
            url: '/v1_0/mp/articles/' + articleId,
            method: 'DELETE',
        });
        // 4.5 删除最后一页的最后一条数据，需要自动向前翻页
        const childCount = document.querySelector('.art-list').children.length;
        if (childCount === 1 && queryObj.page !== 1) {
            queryObj.page--;
            document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`;
        }

        // 4.4 删除成功后，刷新文章列表
        getArticleList();

    }
})
// 点击编辑按钮，跳转到发布文章页面，并且携带文章ID
document.querySelector('.art-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('edit')) {
        const artId = e.target.parentNode.dataset.id;
        location.href = `../publish/index.html?id=${artId}`;

    }
})