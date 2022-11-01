import classes from './CollectionsList.module.css';
import Pagination from '../UI/Pagination/Pagination';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { returnCollectionsByPages } from '../../functions/returnCollectionsByPages';
import { Link } from 'react-router-dom';
import { elementHoverHandle } from '../../../../functions/elementHoverHandle';

const CollectionsList = ({ searchedCollections, currentCollections, collectionsOnPage }) => {

  // console.log('<Collections /> render');
  const params = useParams();

  const collectionsListRef = useRef(null);

  // Для удобства создаю массив с нужными мне коллекциями
  let collectionsArray = searchedCollections.length
    ? // Если в массиве с искомыми коллекциями есть элементы
    returnCollectionsByPages(searchedCollections, collectionsOnPage) // То возвращаем его
    : // Иначе возвращаем массив со всеми текущими коллекциями
    returnCollectionsByPages(currentCollections, collectionsOnPage);
  // Для удобства создаю массив с нужными мне коллекциями END

  let pages = collectionsArray.length; // Кол-во страниц в текущей коллекции

  // Функции
  function createCollectionsArray(array) { // Создаю массив с коллекциями
    return array.map((el, index) => {
      return (
        <Link to={`/collection/${el.id}`} key={index}
          className={[classes.collection, 'custom-hover'].join(' ')}
          onMouseEnter={(e) => elementHoverHandle(e, 'ENTER')}
          onMouseLeave={(e) => elementHoverHandle(e, 'LEAVE', collectionsListRef.current)} data-focused={false}>
          <div className={classes.photo}>
            <img src={el.photos[0]} alt="Фото 1" />
          </div>
          <div className={classes.photo}>
            <img src={el.photos[1]} alt="Фото 2" />
          </div>
          <div className={classes.photo}>
            <img src={el.photos[2]} alt="Фото 3" />
          </div>
          <div className={classes.photo}>
            <img src={el.photos[3]} alt="Фото 4" />
          </div>
          <strong className={classes.title}>{el.name}</strong>
        </Link>
      );
    });
  }
  // Функции END

  return (
    <>
      <div className={classes.collections} ref={collectionsListRef}>
        {createCollectionsArray(collectionsArray[Number(params.page) - 1])}
      </div>
      {
        pages > 1 // Если страниц больше, чем одна
          ? // Тогда отрисовываем компонент Pagination
          <Pagination pages={pages} />
          : // Иначе не отрисовываем ничего
          false
      }
    </>
  );
};

export default CollectionsList;