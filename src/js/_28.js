
const $ = document.querySelector.bind(document);
let i = 0;
function layout() {
  const container = $(".container");

  const styles = getComputedStyle(container);

  const n = Number(styles.getPropertyValue("--n"));

  const size = Math.floor(window.innerWidth / n);

  const rows = Math.floor(window.innerHeight / (size - window.innerWidth * 0.8333333333 * 0.01)) ;
  console.log(rows)
  let id = 0;

  function getId () {
    id >= 50 ? id = 0 : id += 1;
    return id;
  }
  for (; i < rows + 1 ; i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    for (let j = 0; j < (i % 2 === 0 ? n: n + 1); j++) {
      const item = document.createElement("div");
      item.classList.add("item");
      item.style.background = "url(" + `https://picsum.photos/id/${getId()}/${size}/${size}/` + ")";
      item.style.setProperty("--row", `${i}`);
      item.style.setProperty("--col", `${j}`);
      line.appendChild(item);
    }
    container.appendChild(line);
  }
}
layout();

function view () {
  const lines = document.querySelectorAll(".line");
  const items = [];
  for (let li of lines) {
    let mmp = [];
    for (let im of li.querySelectorAll(".item")) {
      mmp.push(im);
    }
    items.push([...mmp]);
  }
  let element = null;
  function getRoundElement(r, c) {
    let elements = [];
    elements.push([r, c - 1]);
    elements.push([r, c + 1]);
    if (r % 2 === 0) { // 奇数行
      elements.push([r + 1, c]);
      elements.push([r + 1, c + 1]);
      elements.push([r - 1, c]);
      elements.push([r - 1, c + 1]);
    } else {
      elements.push([r + 1, c]);
      elements.push([r + 1, c - 1]);
      elements.push([r - 1, c]);
      elements.push([r - 1, c - 1]);
    }
    elements = elements.filter(d => 0 <= d[0] && d[0] < lines.length && 0 <= d[1] && d[1] < [...items[d[0]]].length);
    return elements;
  }
  function mouseEnter (event) {
    element = event.target;
    const styles = getComputedStyle(element);
    const row = Number(styles.getPropertyValue("--row"));
    const col = Number(styles.getPropertyValue("--col"));
    element.style.transform = `scale(1.3)`;
    for (let [r, c] of getRoundElement(row, col)) {
      items[r][c].style.transform = "scale(0.7)";
    }

  }
  function mouseOut (event) {
    element = event.target;
    const styles = getComputedStyle(element);
    const row = Number(styles.getPropertyValue("--row"));
    const col = Number(styles.getPropertyValue("--col"));
    for (let [r, c] of getRoundElement(row, col)) {
      items[r][c].style.transform = "";
    }
    element.style.transform = "";
  }

  // console.log(items)
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].length; j++) {
      items[i][j].addEventListener("mouseenter", mouseEnter);
      items[i][j].addEventListener("mouseout", mouseOut);
    }
  }

}
view();
function refullow() {
  // init
  layout();
  // view
  view();
}

window.addEventListener("resize", debounce(refullow))





