const container = document.getElementById('container');

//设置函数在指定时间运行
window.setInterval(() => {
    const now = new Date();
    // console.log(now.toLocaleTimeString());
    const hour = now.getHours();
    if (hour >= 6 && hour <= 18) {
        container.className = 'light';
    }
    else {
        container.className = 'dark';
    }
},1000)