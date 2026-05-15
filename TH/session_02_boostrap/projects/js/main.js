/**------------------Animate progress bar------------------- */
const skillItems = document.querySelectorAll('.skill-item');
/**
 * Create new IntersectionObserver to folow the element in the viewpoint (screen).
 */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const item = entry.target;

    const percentage = item
      .querySelector('.percentage')
      .textContent.trim();

    const progress = item.querySelector('.skill-progress');

    //Has the entry checked in the viewpoint
    if (entry.isIntersecting) {
      progress.style.width = percentage;
    } else {
      progress.style.width = '0';
    }
  });
});
skillItems.forEach(item => observer.observe(item));