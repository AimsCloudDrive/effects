function debounce(func, duration = 500) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    const args = arguments
    const _this = this
    timer = setTimeout( () => func.apply(_this, args) ,duration)
  }
}
