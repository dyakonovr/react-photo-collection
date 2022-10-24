import { useContext } from 'react';
import { CategoriesContext } from '../../../contexts/CategoriesContext';
import classes from './CategoriesList.module.css';

const CategoriesList = () => {
  // console.log('<CategoriesList /> render');


  // Принимаю контекст
  const { categories, collections, currentCategory, setCurrentCategory,
    setCurrentCollections, setSearchedCollections, setCurrentPage } = useContext(CategoriesContext);
  // Принимаю контекст END

  // Функции
  function changeCurrentCategory(target) {
    const newCurrentCategoryID = target.dataset.id;
    setCurrentCategory(Number(newCurrentCategoryID));
    setCurrentCollections(collections[String(newCurrentCategoryID)]);
    setSearchedCollections([]);
    setCurrentPage(1);
  }
  // Функции END

  // Создаю список категорий
  const categoriesList = categories.map((el, index) => {
    return <li
      className={index === currentCategory ? [classes.category, classes.category_active].join(' ') : classes.category}
      key={index}
      data-id={index}
      onClick={(e) => { changeCurrentCategory(e.target) }}
    >
      {el.name}
    </li>;
  });
  // Создаю список категорий END


  return (
    <ul className={classes.categories}>
      {categoriesList}
    </ul>
  );
};

export default CategoriesList;