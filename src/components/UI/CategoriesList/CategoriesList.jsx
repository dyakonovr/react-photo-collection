import { useContext } from 'react';
import { Categories } from '../../../contexts/Categories';
import classes from './CategoriesList.module.css';

const CategoriesList = () => {
  const categories = useContext(Categories);

  // Создаю список категорий
  const categoriesList = categories.map((el, index) => {
    return <li className={index === 0 ? [classes.category, classes.category_active].join(' ') : classes.category} key={index}>{el.name}</li>;
  });
  // Создаю список категорий END


  return (
    <ul className={classes.categories}>
      {categoriesList}
    </ul>
  );
};

export default CategoriesList;