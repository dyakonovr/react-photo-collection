import Fuse from 'fuse.js';
import { useContext } from 'react';
import { Context } from '../../../contexts/Context';
import classes from './Input.module.css';

const Input = () => {
  const { currentCollections, setSearchedCollections } = useContext(Context);

  function searchCollection(input) {
    const value = input.value;
    const matches = [];

    // Создаю массив колекций, подходящих под значение из <input>
    for (let el of currentCollections) {
      if (el.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) { // Если в заголовке коллекции есть буквы/слова, которые ввёл пользователь
        matches.push(el); // Тогда я добавляю их в массив совпадений
      }
    }
    // Создаю массив колекций, подходящих под значение из <input> END

    setSearchedCollections(matches);
  }

  return (
    <input type="text" className={classes.input} placeholder="Найти коллекцию.." onChange={(e) => { searchCollection(e.target) }} />
  );
};

export default Input;