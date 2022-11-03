import { useContext } from 'react';
import { CategoriesContext } from '../../../contexts/CategoriesContext';
import classes from './CategoriesList.module.css';

const CategoriesList = () => {
  const { currentCategory, setSearchParams } = useContext(CategoriesContext);

  // Принимаю контекст
  const { categories, filteredCollections, setCurrentCollections, setSearchedCollections, setInputValue } = useContext(CategoriesContext);
  // Принимаю контекст END

  // Функции
  function changeCurrentCategory(target) {
    const newCurrentCategoryID = target.dataset.id;
    setCurrentCollections(filteredCollections[String(newCurrentCategoryID)]); // Меняем текущие коллекции
    setSearchedCollections([]); // Сбрасываем массив с искомыми коллекциями
    setInputValue(''); // Сбрасываем value у <Input />
    setSearchParams({ category: newCurrentCategoryID, page: 1})
  }
  // Функции END

  // Создаю список категорий
  const categoriesList = categories.map((el, index) => {
    return <div
      className={index === Number(currentCategory) ? [classes.category, classes.category_active].join(' ') : classes.category}
      key={index}
      data-id={index}
      onClick={(e) => { changeCurrentCategory(e.target) }}
    >
      {el.name}
    </div>;
  });
  // Создаю список категорий END


  return (
    <ul className={classes.categories}>
      {categoriesList}
    </ul>
  );
};

export default CategoriesList;