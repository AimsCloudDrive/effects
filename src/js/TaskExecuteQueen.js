/**
 * 依次顺序执行一系列任务
 * 所有任务完成后可以得到每个任务的结果
 * 需要两个方法，start用于启动任务，pause用于暂停任务
 * 每个任务据哟原子性，即不可中断，只能在两个任务之间中断
 * @param {...Function} tasks 任务列表 每个任务无参 异步
 */
function processTasks(...tasks) {
    let isRunning = false;
    let i = 0
    const result = [];
    return {
        start() {
            return new Promise(async (resolve, reject) => {
                if (isRunning === true) return;
                isRunning = true;
                // 依次执行
                while (i < tasks.length) {
                    try {
                        result.push(await tasks[i]())
                    } catch { // 异步任务错误
                        reject(result);
                        break;
                    }
                    i++;
                    if (!isRunning) return;
                }
                // 任务结束
                resolve(result);
                isRunning = false;
            });



        },
        pause() {
            if (isRunning) {
                isRunning = false;
                console.log("tasks pause");
            }
        }
    }
}