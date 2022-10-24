import classes from './Collections.module.css';
import Pagination from '../UI/Pagination/Pagination';
import { useContext, useRef, useState } from 'react';
import { CollectionsContext } from '../../contexts/CollectionsContext';

const Collections = ({ searchedCollections, currentCollections }) => {
  // console.log('<Collections /> render');

  const [collectionIsHover, setCollectionIsHover] = useState(false);
  const { currentPage } = useContext(CollectionsContext);

  const collectionsListRef = useRef(null);

  // Для удобства создаю массив с нужными мне коллекциями
  let collectionsArray = searchedCollections.length
    ? // Если в массиве с искомыми коллекциями есть элементы
    searchedCollections // То возвращаем его
    : // Иначе возвращаем массив со всеми текущими коллекциями
    currentCollections;
  // Для удобства создаю массив с нужными мне коллекциями END


  let pages = collectionsArray.length; // Кол-во страниц в текущей коллекции

  // Функции
  function collectionHoverHandle(e, type) {
    if (type === 'ENTER') {
      const focusedCollection = e.currentTarget;
      focusedCollection.dataset.focused = true;
      setCollectionIsHover(true);
    } else {
      let collectionsChildActive = collectionsListRef.current.querySelector('div[data-focused=true]');
      collectionsChildActive.dataset.focused = false;
      setCollectionIsHover(false);
    }
  }

  function createCollectionsArray(array) { // Создаю массив с коллекциями
    return array.map((el, index) => {
      return <div className={classes.collection} key={index} onMouseEnter={(e) => collectionHoverHandle(e, 'ENTER')}
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

export default Collections;