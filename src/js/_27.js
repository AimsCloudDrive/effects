const start = document.querySelector('.start')
const pause = document.querySelector('.pause')
const container = document.querySelector(".container")

const tasks = [];
for (let i = 0; i < 5; i++) {
    tasks.push(
        () =>
            new Promise(
                (resolve, reject) => {
                    setTimeout(() => {
                        const span = document.createElement('span')
                        if (i !== 3) {
                            span.textContent = `第${i}个任务结束`
                            container.appendChild(span)
                            resolve(`第${i}个任务结束`);
                        } else {
                            span.textContent = `第${i}个任务错误`
                            container.appendChild(span)
                            reject(`第${i}个任务错误`)
                        }
                    }, 2000);
            })
    );
}


const tasksExecuteQueen =  processTasks(...tasks);

start.onclick = async () => {
    console.log("任务开始");
    const result = await tasksExecuteQueen.start();
    console.log("任务执行完毕");
    console.log(result);
}
pause.onclick = tasksExecuteQueen.pause;
