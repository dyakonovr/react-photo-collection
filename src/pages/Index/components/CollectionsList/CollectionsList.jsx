import classes from './CollectionsList.module.css';
import Pagination from '../UI/Pagination/Pagination';
import { useContext, useRef } from 'react';
import { CollectionsContext } from '../../contexts/CollectionsContext';
import { returnCollectionsByPages } from '../../functions/returnCollectionsByPages';
import { Link } from 'react-router-dom';

const CollectionsList = ({ searchedCollections, currentCollections, collectionsOnPage }) => {
  // console.log('<Collections /> render');
  const { currentPage } = useContext(CollectionsContext);

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
  function collectionHoverHandle(e, type) { // Обрабатываю фокус на коллекции
    if (type === 'ENTER') { // Если мы наводим курс
      const focusedCollection = e.currentTarget; // Находим элемент, на который навелись
      focusedCollection.dataset.focused = true; // Меняем его data-атрибут (data-focused) на true
    } else { // Иначе
      let collectionsChildActive = collectionsListRef.current.querySelector('div[data-focused=true]'); // Находим активный элемент
      collectionsChildActive.dataset.focused = false; // Меняем его data-атрибут (data-focused) на false
    }
  }

  function createCollectionsArray(array) { // Создаю массив с коллекциями
    return array.map((el, index) => {
      return (<Link to='/collection' key={index}>
        <div className={classes.collection} onMouseEnter={(e) => collectionHoverHandle(e, 'ENTER')}
          onMouseLeave={() => collectionHoverHandle('LEAVE')} data-focused={false}>
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
        </div>
      </Link>);
    });
  }
  // Функции END

  return (
    <>
      <div className={classes.collections} ref={collectionsListRef}>
        {createCollectionsArray(collectionsArray[currentPage - 1])}
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