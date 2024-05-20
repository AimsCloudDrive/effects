const Pagination = {
    // 存放分页的容器
    code: '',
    // 转换初始化数据
    Extend: function (data) {
        data = data || {};
        Pagination.size = data.size || 30;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 3;
    },
    // 创建分页
    Add: function (s, f) {
        for (const i = s; i <= f; i++) {
            if (i === 31){
                break;
            }
            Pagination.code += '<a>' + i + '</a>';
        }
    },
    // 带有省略号的第一页
    First: function () {
        Pagination.code += '<a>1</a><i>...</i>';
    },
    // 带有省略号的最后一页
    Last: function () {
        Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
    },
    // 更改页码
    Click: function () {
        Pagination.page = +this.innerHTML;
        Pagination.Start();
    },
    // 上一页
    Prev: function () {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        Pagination.Start();
    },
    // 下一页
    Next: function () {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        Pagination.Start();
    },
    // 绑定页码点击事件，并为当前页设置样式
    Bind: function () {
        const a = Pagination.e.getElementsByTagName('a');
        for (const i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) {
                a[i].className = 'current';
            }
            +a[i].addEventListener('click', Pagination.Click);
        }
    },
    // 写入分页
    Finish: function () {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },
    // 根据分页类型做不同的呈现
    Start: function () {
Pagination.code = '';
        if (Pagination.size <= Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        } else if (Pagination.page < Pagination.step + 1) {
            Pagination.Add(1, Pagination.step * 2 + 4);
            Pagination.Last();
        } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        } else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step);
            Pagination.Last();
        }
        Pagination.Finish();
    },
    // 绑定上一页和下一页按钮点击事件
    Buttons: function (e) {
        const nav = e.getElementsByTagName('a');
        nav[0].addEventListener('click', Pagination.Prev);
        nav[1].addEventListener('click', Pagination.Next);
    },
    // 创建初始化结构
    Create: function (e) {
        const html = [
            '<a>&#9668</a>',
            '<span></span>',
            '<a>&#9658</a>'
        ];
        e.innerHTML = html.join('');
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Buttons(e);
    },
    // 初始化
    Init: function (e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();
    }
}
// 绑定分页组件
const init = function () {
    Pagination.Init(document.getElementById('pagination'), {
        size: 30,
        page: 1,
        step: 3
    });
};
// dom加载完成后初始化分页组件
// document.addEventListener('DOMContentLoaded', init);
init();
