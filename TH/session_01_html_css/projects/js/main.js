/** Opened/closed menu toggle.*/
document.addEventListener('click', (e) => {
  const btnMenu = document.getElementById('btn-menu');
  const listMenuItems = document.getElementById('list-menu-items');

  btnMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    listMenuItems.classList.add('active');
    btnMenu.style.visibility = 'hidden';
  });


  document.addEventListener('click', () => {
    listMenuItems.classList.remove('active');
    btnMenu.style.visibility = 'visible';
  })
})