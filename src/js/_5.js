const resetBtn = document.querySelector('#btn');
const neontext = new Neontext('text');
neontext.render.run();
resetBtn.addEventListener('click', () => {
  neontext.render.killer();
})