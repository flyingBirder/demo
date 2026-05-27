function animate(obj,target,callback){
    clearInterval(obj.timer); //解决一个bug：不停的点击按钮，定时器会累加，导致元素移动速度加快
     obj.timer = setInterval(function(){
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);// Math.ceil()向上取整，Math.floor()向下取整
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);
            if(callback){                 
                callback();
            }
        }else{
            obj.style.left = obj.offsetLeft + step+ 'px';
        }
    },15);
}