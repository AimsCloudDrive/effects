/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 每个歌词对象：
 * {time: 开始时间, words: 歌词内容}
 */
function parseLrc() {
    const lrcs = lrc.split('\n');
    const result = []
    for (let i = 0; i < lrcs.length; i++) {
        let str = lrcs[i];
        const parts = str.split(']')
        let timeStr = parts[0].substring(1);
        // console.log(timeStr);
        const obj = {
            time: parseTime(timeStr),
            words: parts[1],
        };
        result.push(obj);
    }
    return result;
}

/**
 * 将一个时间字符串解析为数字
 * @param timeStr 时间字符串
 * @returns {number}
 */
function parseTime(timeStr) {
    const parts = timeStr.split(':');
    return +parts[0] * 60 + +parts[1]
}
const lrcData = parseLrc();

// 获取需要的dom
const doms = {
    audio: document.querySelector('audio'),
    ul: document.querySelector('ul'),
    body: document.body,
    divContainer: document.querySelector('.container')
}

/**
 * 计算出，在当前播放器播放到第几秒的情况
 * lrcData数组中，应该高亮显示的歌词下标
 * 如果没有任何歌词显示 则返回-1
 */
function findIndex() {
    const curTime = doms.audio.currentTime;
    for (let i = 0; i < lrcData.length; i++) {
        if (curTime < lrcData[i].time) {
            return i - 1;
        }
    }
    // 循环结束，则到最后一句歌词
    return lrcData.length - 1;
}

// 界面
/**
 * 创建歌词元素 li
 */
function createLrcElements() {
    /*
    const ul = document.createElement('ul');
    for (let i = 0; i < lrcData.length; i++) {
        let li = document.createElement('li')
        li.textContent = lrcData[i].words;
        ul.appendChild(li);
    }
    doms.body.querySelector('.container').appendChild(ul);
    */
    const frag = document.createDocumentFragment(); // 文档片段
    for (let i = 0; i < lrcData.length; i++) {
        let li = document.createElement('li')
        li.textContent = lrcData[i].words;
        frag.appendChild(li);
    }
    doms.ul.appendChild(frag);
}
createLrcElements();


let containerClientHeight = doms.divContainer.clientHeight;
let liClientHeight = doms.ul.children[0].clientHeight;
let maxOffset = lrcData.length * liClientHeight;
/**
 * 设置ul的偏移量
 */

function setOffset() {
    let newIndex = findIndex();
    if (newIndex === -1 ) return;
    doms.ul.children[newIndex - 1]?.classList.remove('active');
    doms.ul.children[newIndex + 1]?.classList.remove('active');
    let offset = liClientHeight * (newIndex + 0.5) - containerClientHeight / 2;
    doms.ul.style.transform =
        `translateY(-${offset > 0? (offset > maxOffset? maxOffset: offset): 0}px)`;
    doms.ul.children[newIndex].classList.add('active');
}

doms.audio.addEventListener('timeupdate', setOffset)
