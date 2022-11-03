import { useContext } from 'react';
import { CollectionContext } from '../../../../Collection/context/CollectionContext';
import classes from './Pagination.module.css';

const Pagination = ({ pages }) => {
  const { currentPage, currentCategory, setSearchParams } = useContext(CollectionContext);

  // Функции
  function createPagesList(currentPage, pages) {
    // Создаю и заполняю массив страниц
    const pagesList = [];
    if (currentPage < 3) { // Если активная страница - первая или вторая
      for (let i = 0; i < Math.min(3, pages); i++) {
        if (i + 1 === currentPage) { // Если это первая страница, то она по дефолту активная
          pagesList.push(<li className={classes.page} onClick={() => { setSearchParams({ category: currentCategory, page: i + 1 }) }} data-active={true} data-value={i + 1} key={i}>{i + 1}</li>)
        } else {
          pagesList.push(<li className={classes.page} onClick={() => { setSearchParams({ category: currentCategory, page: i + 1 }) }} data-active={false} data-value={i + 1} key={i}>{i + 1}</li>)
        }
      }
    }

    else if (currentPage >= 3 && currentPage !== pages) { // Если активная страница больше третьей и она не последняя
      pagesList.push(
        <li className={classes.page} onClick={() => { setSearchParams({ category: currentCategory, page: currentPage - 1 }) }} data-active={false}
          data-value={currentPage - 1} key={0}>{currentPage - 1}</li>
      );

      pagesList.push(
        <li className={classes.page} onClick={() => { setSearchParams({ category: currentCategory, page: currentPage }) }} data-active={true}
          data-value={currentPage} key={1}>{currentPage}</li>
      );

      pagesList.push(
        <li className={classes.page} onClick={() => { setSearchParams({ category: currentCategory, page: currentPage + 1 }) }} data-active={false}
          data-value={currentPage + 1} key={2}>{currentPage + 1}</li>
      );
    }

    else { // Если страница последняя
      for (let i = currentPage - 3; i < currentPage; i++) {
        if (i + 1 === currentPage) { // Если это первая страница, то она по дефолту активная
          pagesList.push(
            <li className={classes.page} onClick={() => { setSearchParams({ category: currentCategory, page: i + 1 }) }} data-active={true}
              data-value={i + 1} key={i}>{i + 1}</li>
          )
        } else {
          pagesList.push(
            <li className={classes.page} onClick={() => { setSearchParams({ category: currentCategory, page: i + 1 }) }} data-active={false}
              data-value={i + 1} key={i}>{i + 1}</li>);
        }
      }
    }

    return pagesList;
  }
  // Функции END

  return (
    <ul className={classes.list}>
      {/* key={-1} и key={pages + 1} - рандомные числа, чтобы не было ошибки */}
      <li className={classes.page} onClick={() => { setSearchParams({ category: currentCategory, page: 1 }) }}
        data-value={1} key={-1} title="Перейти на первую страницу">&larr;</li>
      {createPagesList(currentPage, pages)}
      <li className={classes.page} onClick={() => { setSearchParams({ category: currentCategory, page: pages }) }}
        data-value={pages} key={pages + 1} title="Перейти на последнюю страницу">&rarr;</li>
    </ul>
  );
};

export default Pagination;