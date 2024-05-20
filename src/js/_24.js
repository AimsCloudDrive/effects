const $ = document.querySelector.bind(document);

const doms = {
    fileSelect: $(".file-select"),
    fileInput: $(".file"),
    container: $(".container"),
    progress: $(".progress"),
    progressCancel: $("span.progressCancel"),
    resultCancel: $("button.resultCancel"),
    progressValueSpan: $(".value"),
    imgPrev: $(".prev"),
    imgFini: $(".finished")
};
doms.progressCancel.onmouseover = () => {
    doms.progressCancel.className = "progressCancelHover";
}
doms.progressCancel.onmouseout = () => {
    doms.progressCancel.className = "progressCancel";
}
function showArea(areaName) {
    doms.container.className = `container ${areaName}`;
}

function setProgress(val) {
    doms.progressValueSpan.innerHTML = `${val}%`;
    doms.progress.style.setProperty("--progress", val);
}
let cancelUpload = null;
function cancel() {
    cancelUpload && cancelUpload();
    doms.fileInput.value = "";
    showArea("select")
}

doms.fileSelect.onclick = function () {
    doms.fileInput.click()
}
doms.fileInput.onchange = function () {
    if (this.files.length === 0) return;
    const file = this.files[0];
    if (!validateFIle(file)) return;
    showArea("progress")
    // 显示预览图
    const reader = new FileReader();
    reader.onload = function (e) {
        doms.imgPrev.src = e.target.result;
        doms.imgFini.src = e.target.result;
    }
    reader.readAsDataURL(file);


    cancelUpload = upload(file,
        function (val) {
            console.log(val)
            setProgress(val);
        },
        function (resp) {
            showArea("result");
        }
    );
    doms.progressCancel.onclick = cancel;
    doms.resultCancel.onclick = cancel;

}
function upload( file, onProgress, onFinish) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const resp = JSON.parse(xhr.responseText);
        onFinish(resp);
    }
    xhr.upload.onprogress = e => {
        const percent = Math.floor(e.loaded / e.total * 100);
        onProgress(percent);
    }
    xhr.open('POST', "http://localhost:8080/file.upload")
    const form = new FormData();
    form.append("multipartFiles", file)
    xhr.send(form)
    return function () { xhr.abort() };
}

function validateFIle(file) {
    const sizeLimit = 5 * 1024 * 1024;
    const legalExts = [".jgp", ".jpeg", ".png", ".webp", ".bmp", ".gif"];
    if (file.size > sizeLimit) {
        alert("文件尺寸过大!")
        return false;
    }
    const name = file.name.toLowerCase();
    if ( legalExts.some( ext=> name.endsWith(ext) ) ) {
        return true;
    } else {
        alert("文件类型不正确!")
        return false;
    }
}


