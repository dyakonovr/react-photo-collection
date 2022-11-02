import { useParams, Link } from 'react-router-dom';
import classes from './Pagination.module.css';

const Pagination = ({ pages }) => {
  // console.log('<Pagination /> render');

  const params = useParams();
  const currentPage = Number(params.page);

  // Функции
  function changeCurrentPage(e) {
    const activePage = e.currentTarget.querySelector('li[data-active=true]'); // e.currentTarget = <ul class="list">
    const target = e.target; // Кнопка с номер страницы, по которой мы кликнули

    // Меняю значения data-active активной страницы и нужной нам местами
    [activePage.dataset.active, target.dataset.active] = [target.dataset.active, activePage.dataset.active];
  }

  function createPagesList(currentPage, pages) {
    // Создаю и заполняю массив страниц
    const pagesList = [];
    if (currentPage < 3) { // Если активная страница - первая или вторая
      for (let i = 0; i < Math.min(3, pages); i++) {
        if (i + 1 === currentPage) { // Если это первая страница, то она по дефолту активная
          pagesList.push(<Link to={`/collections/${params.category_id}/${i + 1}`} className={classes.page} data-active={true} data-value={i + 1} key={i}>{i + 1}</Link>)
        } else {
          pagesList.push(<Link to={`/collections/${params.category_id}/${i + 1}`} className={classes.page} data-active={false} data-value={i + 1} key={i}>{i + 1}</Link>)
        }
      }
    }

    else if (currentPage >= 3 && currentPage !== pages) { // Если активная страница больше третьей и она не последняя
      pagesList.push(<Link to={`/collections/${params.category_id}/${currentPage - 1}`} className={classes.page}
        data-active={false} data-value={currentPage - 1} key={0}>{currentPage - 1}</Link>);

      pagesList.push(<Link to={`/collections/${params.category_id}/${currentPage}`} className={classes.page}
        data-active={true} data-value={currentPage} key={1}>{currentPage}</Link>)

      pagesList.push(<Link to={`/collections/${params.category_id}/${currentPage + 1}`} className={classes.page}
        data-active={false} data-value={currentPage + 1} key={2}>{currentPage + 1}</Link>)
    }

    else { // Если страница последняя
      for (let i = currentPage - 3; i < currentPage; i++) {
        if (i + 1 === currentPage) { // Если это первая страница, то она по дефолту активная
          pagesList.push(<Link to={`/collections/${params.category_id}/${i + 1}`} className={classes.page} data-active={true} data-value={i + 1} key={i}>{i + 1}</Link>)
        } else {
          pagesList.push(<Link to={`/collections/${params.category_id}/${i + 1}`} className={classes.page} data-active={false} data-value={i + 1} key={i}>{i + 1}</Link>)
        }
      }
    }

    return pagesList;
  }
  // Функции END

  return (
    <ul className={classes.list} onClick={(e) => {
      if (e.target.tagName === 'LI') { // Если мы кликнули по кнопке страницы, а не на пустое место
        changeCurrentPage(e) // Вызываем функцию
      }
    }}>
      {/* key={pages + 1} и key={pages + 2} - рандомные числа, чтобы не было ошибки */}
      <Link to={`/collections/${params.category_id}/1`} className={classes.page} data-value={1} key={pages + 1} title="Перейти на первую страницу">&larr;</Link>
      {createPagesList(currentPage, pages)}
      <Link to={`/collections/${params.category_id}/${pages}`} className={classes.page} data-value={pages} key={pages + 2} title="Перейти на последнюю страницу">&rarr;</Link>
    </ul>
  );
};

export default Pagination;