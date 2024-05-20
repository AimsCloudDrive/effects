const $ = document.querySelector.bind(document)
const doms = {
    canvas: $("#cvs")
}


doms.canvas.width = window.innerWidth * window.devicePixelRatio;
doms.canvas.height = window.innerHeight * window.devicePixelRatio;

// 绘制上下文
class CodeRainUtils {

    constructor(cvs, model) {
        this.ctx = cvs.getContext(model);
        this.size = {
            wWidth: window.innerWidth * window.devicePixelRatio,
            wHeight: window.innerHeight * window.devicePixelRatio,
            fontSize: 20 * window.devicePixelRatio
        }
        this.nextChar = null;
        this.lastTimestamp = new Date();
        this.interval = 30;
        this.timestamp = new Date();
    }

    init() {
        this.size.columnWidth = this.size.fontSize;
        this.size.columnCount = Math.floor(this.size.wWidth / this.size.columnWidth);
        this.nextChar = new Array(this.size.columnCount).fill(0)
    }

    /**
     * 随机内容
     * 一个字符
     * @returns {string}
     */
    getRandomContext() {
        const content = `console.log('Hello World')`;
        return content[Math.floor(Math.random() * content.length)];
    }

    /**
     * 随机颜色
     * 16进制
     * @returns {string}
     */
    getRandomColor() {
        const colors = [
            '#33b5e5',
            '#0099cc',
            '#aa66cc',
            '#9933cc',
            '#99cc00',
            '#669900',
            '#ff8833',
            '#ff8800',
            '#cc0000',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        requestAnimationFrame(() => {
            this.draw()
        });
        if (this.timestamp - this.lastTimestamp < this.interval) {
            this.timestamp = new Date();
            return;
        }
        this.ctx.fillStyle = "rgba(240, 240, 240, 0.1)";
        this.ctx.fillRect(0, 0, this.size.wWidth, this.size.wHeight)
        for (let i = 0; i < this.size.columnCount; i++) {
            // 画一个字符
            // 颜色、字体、大小、内容、位置
            this.ctx.fillStyle = this.getRandomColor();
            const context = this.getRandomContext();
            this.ctx.font = `${this.size.fontSize}px "roboto Mono"`;
            let x = i * this.size.columnWidth,
                s = this.nextChar[i],
                y = (s + 1) * this.size.fontSize;

            this.ctx.fillText(context, x, y);
            if (y > this.size.wHeight && Math.random() > 0.99) {
                this.nextChar[i] = 0
            } else {
                this.nextChar[i]++;
            }
        }
        this.lastTimestamp = this.timestamp;


    }

}


const gru = new CodeRainUtils(doms.canvas, "2d");
gru.init();
// gru.draw()
// setInterval(() => {
//     gru.draw()
// }, 30)
gru.draw();
