import classes from './Collections.module.css';
import Pagination from '../UI/Pagination/Pagination';
import { useState } from 'react';

const Collections = ({ currentCollections, searchedCollections, collectionsOnPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Для удобства создаю массив с нужными мне коллекциями
  const collectionsArray = searchedCollections.length
    ? // Если в массиве с искомыми коллекциями есть элементы
    searchedCollections // То возвращаем его
    : // Иначе возвращаем массив со всеми текущими коллекциями
    currentCollections;
  // Для удобства создаю массив с нужными мне коллекциями END

  const pages = collectionsArray.length; // Кол-во страниц в текущей коллекции

  // Функции
  function createCollectionsArray(array) { // Создаю массив с коллекциями
    return array.map((el, index) => {
      return <div className={classes.collection} key={index}>
        <div className={classes.photo}>
          <img src={el.photos[0]} alt={el.name} />
        </div>
        <div className={classes.photo}>
          <img src={el.photos[1]} alt={el.name} />
        </div>
        <div className={classes.photo}>
          <img src={el.photos[2]} alt={el.name} />
        </div>
        <div className={classes.photo}>
          <img src={el.photos[3]} alt={el.name} />
        </div>
        <strong className={classes.title}>{el.name}</strong>
      </div>
    });
  }
  // Функции END

  return (
    <div className={classes.collections}>
      {createCollectionsArray(collectionsArray[currentPage - 1])}
      {pages > 1 // Если страниц больше, чем одна
        ? // Тогда отрисовываем компонент Pagination
        <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        : // Иначе не отрисовываем ничего
        false
      }
    </div>
  );
};

export default Collections;