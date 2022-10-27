export const disableScroll = () => {
  const pagePosition = window.scrollY;
  const paddingOffset = `${(window.innerWidth - document.body.offsetWidth)}px`;

  document.documentElement.style.scrollBehavior = 'none';
  document.body.style.paddingRight = paddingOffset;
  document.body.classList.add('dis-scroll');
  document.body.dataset.position = pagePosition;
  document.body.style.top = `-${pagePosition}px`;
}