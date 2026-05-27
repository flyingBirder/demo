window.onload = function(){
    var sliderbar = document.querySelector('.sliderbar');
    var ul = sliderbar.querySelector('ul');
    var ol = sliderbar.querySelector('.indicator');
    var arrowLeft = sliderbar.querySelector('.arrow-left');
    var arrowRight = sliderbar.querySelector('.arrow-right');
    var num = 0;
    var circle = 0;
    var flag = true;    // 1.鼠标经过，左右箭头显示，离开隐藏
    sliderbar.addEventListener('mouseenter',function(){
        arrowLeft.style.display = 'block';
        arrowRight.style.display = 'block';
        // 鼠标进入轮播图区域，清除自动轮播定时器
        clearInterval(timer);
        timer = null;
    });
    sliderbar.addEventListener('mouseleave',function(){
        arrowLeft.style.display = 'none';
        arrowRight.style.display = 'none';
        // 鼠标离开轮播图区域，重新开启自动轮播
        timer= setInterval(function(){
            // 点击右侧按钮，实现自动轮播
            arrowRight.click();
        },2000)
    });
    // 2.动态生成下方的小圆圈指示器，根据ul里面的li的数量生成
    for(var i = 0;i< ul.children.length;i++){
        var li  = document.createElement('li');
        // 通过自定义属性 给生成的li添加index属性，记录当前li的索引
        li.setAttribute('index',i);
        
        ol.appendChild(li);
        // 给生成的li添加点击事件,排他思想
        li.addEventListener('click',function(){
            // 先清除所有li的current类名
            for(var i = 0;i<ol.children.length;i++){
                ol.children[i].className = '';
            }
            // 再给当前点击的li添加current类名
            this.className = 'current';
            var index = this.getAttribute('index');
            // 点击小圆圈指示器，需要将num和circle设置为当前点击的索引
            num = index;
            circle = index;
            var target = -index*sliderbar.offsetWidth;
            animate(ul,target);

        })

    }
    //ol 里面的第一个li 添加current类名
    ol.children[0].className = 'current';

    // 克隆ul的第一个li,添加到ul的最后面
    var firstli = ul.children[0].cloneNode(true);
    console.log(firstli);
    ul.appendChild(firstli);

    // 点击右侧按钮，图片滚动,切换小圆圈指示器
    arrowRight.addEventListener('click',function(){
        // 设置节流阀，防止点击过快，导致图片滚动不 smooth
        if(flag){
            flag = false;
            // 如果滚动到最后一张图片，此时需要将ul的left设置为0,实现无缝滚动
        if(num>=ul.children.length-1){
            num = 0;
            ul.style.left = '0px';
        }
        num++;
        animate(ul,-num*sliderbar.offsetWidth,function(){
            // 回调函数的好处，就是图片滚动完成后，再开启节流阀
            // 图片滚动完成后，开启节流阀
            flag = true;
        });
        circle++;
        // 如果circle等于ol的长度，需要将circle重置为0
        // if(circle == ol.children.length){
        //     circle = 0;
        // }
        circle = circle == ol.children.length ? 0 : circle;


        // 调用circleChange函数，切换小圆圈指示器
        circleChange();

        }

        
    });
    // 点击左侧按钮，图片滚动，小圆圈切换
    // 左边没有设置设置节流阀，会出现点击过快，导致图片滚动不 smooth
    arrowLeft.addEventListener('click',function(){
        // 如果滚动到第一张图片，此时需要将ul的left设置为最后一张图片的位置,实现无缝滚动
        if(num == 0){
            num = ul.children.length-1;
            ul.style.left = -num*sliderbar.offsetWidth+'px';
        }
        num--;
        animate(ul,-num*sliderbar.offsetWidth);
        circle--;
        // 如果circle小于0，说明第一个图片，需要将小圆圈指示器切换到最后一个
        // if(circle < 0){
        //     circle = ol.children.length-1;
        // }
        circle = circle<0?ol.children.length-1:circle;
        // 调用circleChange函数，切换小圆圈指示器
        circleChange();
        
    });


    function circleChange(){
        // 先清楚其余小圆圈的current类名
        for(var i= 0;i<ol.children.length;i++){
            ol.children[i].className = '';
        }
        // 再给当前小圆圈添加current类名
        ol.children[circle].className = 'current';
    }
    // 3. 自动轮播
    var timer= setInterval(function(){
        // 手动调用右侧按钮点击事件，实现自动轮播
        arrowRight.click();
    },2000)



}