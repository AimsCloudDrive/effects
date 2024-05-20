function init(t) {
    t /= 4000; //速度，数值越大速度越慢
    console.log(t)
    let c = document.getElementById("canvas"),
        ctx = c.getContext("2d"),
        cw = c.width = window.innerWidth,
        ch = c.height = window.innerHeight,
        increment = 20; //增量
    // 在给定矩形内清空一个矩形
    ctx.clearRect(0, 0, cw, ch);
    // 指定在图形重叠的地方，颜色由两种颜色相加值来决定
    ctx.globalCompositeOperation = "lighter";
    for (let n = 0;n < 3; n++) {
        // 设置3种填充色
        if (n === 0) {
            ctx.fillStyle = '#f00';
        }
        if (n === 1) {
            ctx.fillStyle = '#0f0';
        }
        if (n === 2) {
            ctx.fillStyle = '#00f';
        }
        for (let i = 0;i < ch; i += increment) {
            for (let j = 0;j < cw/2; j += increment) {
                let index = i * cw + j;
                // 设置透明度
                ctx.globalAlpha = Math.tan(index * index - t);
                // 填充矩形
                ctx.fillRect(
                    Math.tan(i * j-Math.sin(index + n / 100) + t) * j + cw / 2 - increment / 2,
                    i,
                    Math.tan(index + i / j + t + n / 100) / 2 * increment / 2,
                    Math.tan(index * index - t) * increment / 2
                );
            }
        }
    }
    // 实现无限滚动
    requestAnimationFrame(init);
}
init();
