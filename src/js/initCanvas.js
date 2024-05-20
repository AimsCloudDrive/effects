
const init = (cvs, width, height, type, option) => {
    cvs.width = width;
    cvs.height = height;
    if (type) {
        if (option) {
            return cvs.getContext(type, option)
        }
        return cvs.getContext(type);
    }
}

const getRandom = (min, max) => {
    return  Math.floor(Math.random() * (max - min + 1)) + min;
}

export {
    init,
    getRandom
}