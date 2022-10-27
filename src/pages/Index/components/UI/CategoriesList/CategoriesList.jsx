import { useContext } from 'react';
import { CategoriesContext } from '../../../contexts/CategoriesContext';
import classes from './CategoriesList.module.css';

const CategoriesList = () => {
  // console.log('<CategoriesList /> render');


  // Принимаю контекст
  const { categories, filteredCollections, currentCategory, setCurrentCategory,
    setCurrentCollections, setSearchedCollections,
    setCurrentPage, setInputValue } = useContext(CategoriesContext);
  // Принимаю контекст END

  // Функции
  function changeCurrentCategory(target) {
    const newCurrentCategoryID = target.dataset.id;
    setCurrentCategory(Number(newCurrentCategoryID)); // Меняем категорию
    setCurrentCollections(filteredCollections[String(newCurrentCategoryID)]); // Меняем текущие коллекции
    setSearchedCollections([]); // Сбрасываем массив с искомыми коллекциями
    setCurrentPage(1); // Сбрасываем активную страницу
    setInputValue(''); // Сбрасываем value у <Input />
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