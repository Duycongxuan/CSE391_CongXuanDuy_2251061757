document.querySelector("#btn-toggle-add-student").addEventListener('click', () => {
  document.querySelector('#studentModal').classList.add('active');
});

document.querySelector('#closeModal').addEventListener('click', () => {
  document.querySelector('#studentModal').classList.remove('active');
})