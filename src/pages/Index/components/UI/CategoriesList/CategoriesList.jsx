import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CategoriesContext } from '../../../contexts/CategoriesContext';
import classes from './CategoriesList.module.css';

const CategoriesList = () => {
  // console.log('<CategoriesList /> render');

  const params = useParams();

  // Принимаю контекст
  const { categories, filteredCollections, setCurrentCollections, setSearchedCollections, setInputValue } = useContext(CategoriesContext);
  // Принимаю контекст END

  // Функции
  function changeCurrentCategory(target) {
    const newCurrentCategoryID = target.dataset.id;
    setCurrentCollections(filteredCollections[String(newCurrentCategoryID)]); // Меняем текущие коллекции
    setSearchedCollections([]); // Сбрасываем массив с искомыми коллекциями
    setInputValue(''); // Сбрасываем value у <Input />
  }
  // Функции END

  // Создаю список категорий
  const categoriesList = categories.map((el, index) => {
    return <Link to={`/collections/${index}/1`}
      className={index === Number(params.category_id) ? [classes.category, classes.category_active].join(' ') : classes.category}
      key={index}
      data-id={index}
      onClick={(e) => { changeCurrentCategory(e.target) }}
    >
      {el.name}
    </Link>;
  });
  // Создаю список категорий END


  return (
    <ul className={classes.categories}>
      {categoriesList}
    </ul>
  );
};

export default CategoriesList;