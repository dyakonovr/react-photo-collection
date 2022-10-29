import { useContext } from 'react';
import { CategoriesContext } from '../../../contexts/CategoriesContext';
import classes from './Input.module.css';

const Input = () => {
  // console.log('<Input /> render');


  const { currentCollections, setSearchedCollections, inputValue, setInputValue } = useContext(CategoriesContext);

  function searchCollection(input) {
    const value = input.value;
    let matches = []; // Создаю массив соответсвий

    if (value !== '') { // Если input value не пуст
      // Создаю массив колекций, подходящих под значение из <input>
      for (let el of currentCollections) { // Перебираю коллекции
        if (el.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) { // Если в заголовке коллекции есть буквы/слова, которые ввёл пользователь
          matches.push(el); // Тогда я добавляю их в массив совпадений
        }
      }
      // Создаю массив колекций, подходящих под значение из <input> END
    }

    setInputValue(value);
    setSearchedCollections(matches);
  }

  return (
    <input type="text" className={classes.input} placeholder="Найти коллекцию.."
      onChange={(e) => { searchCollection(e.target) }} value={inputValue} />
  );
};

export default Input;