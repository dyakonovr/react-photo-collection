export const enableScroll = () => {
  const pagePosition = parseInt(document.body.dataset.position, 10);
  document.body.style.paddingRight = '0px';

  document.body.style.top = 'auto';
  document.body.classList.remove('dis-scroll');
  window.scroll({
    top: pagePosition,
    left: 0
  });
  document.body.removeAttribute('data-position');
  document.documentElement.style.scrollBehavior = 'smooth';
}