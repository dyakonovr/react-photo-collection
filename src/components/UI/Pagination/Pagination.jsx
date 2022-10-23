import classes from './Pagination.module.css';

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  // Создаю и заполняю массив страниц
  const pagesList = [];
  for (let i = 0; i < pages; i++) {
    if (i + 1 === currentPage) { // Если это первая страница, то она по дефолту активная
      pagesList.push(<li className={classes.page} data-active={true} data-value={i + 1} key={i}>{i + 1}</li>)
    } else {
      pagesList.push(<li className={classes.page} data-active={false} data-value={i + 1} key={i}>{i + 1}</li>)
    }
  }
  // Создаю и заполняю массив страниц END

  // Функции
  function changeCurrentPage(e) {
    const activePage = e.currentTarget.querySelector('li[data-active=true]'); // e.currentTarget = <ul class="list">
    const target = e.target; // Кнопка с номер страницы, по которой мы кликнули

    // Меняю значения data-active активной страницы и нужной нам местами
    [activePage.dataset.active, target.dataset.active] = [target.dataset.active, activePage.dataset.active];
    setCurrentPage(target.dataset.value);
  }
  // Функции END

  return (
    <ul className={classes.list} onClick={(e) => { changeCurrentPage(e) }}>
      {pagesList}
    </ul>
  );
};

export default Pagination;