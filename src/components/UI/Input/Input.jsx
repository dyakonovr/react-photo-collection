import { useContext } from 'react';
import { CategoriesContext } from '../../../contexts/CategoriesContext';
import { returnCollectionsByPages } from '../../../functions/returnCollectionsByPages';
import classes from './Input.module.css';

const Input = () => {
  // console.log('<Input /> render');


  const { currentCollections, setSearchedCollections, currentPage, setCurrentPage, collectionsOnPage } = useContext(CategoriesContext);

  function searchCollection(input) {
    const value = input.value;
    let matches = [];

    if (value !== '') { // Если input value не пуст
      // Создаю массив колекций, подходящих под значение из <input>
      for (let el of currentCollections[currentPage - 1]) {
        if (el.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) { // Если в заголовке коллекции есть буквы/слова, которые ввёл пользователь
          matches.push(el); // Тогда я добавляю их в массив совпадений
        }
      }

      if (matches.length !== 0) { // Если совпадения найдены и страниц будет больше, чем одна
        matches = returnCollectionsByPages(matches, collectionsOnPage);
      } // Иначе я верну пустой проект
      // Создаю массив колекций, подходящих под значение из <input> END
    }

    setCurrentPage(1); // Сбрасываю активную страницу в любом случае
    setSearchedCollections(matches);
  }

  return (
    <input type="text" className={classes.input} placeholder="Найти коллекцию.." onChange={(e) => { searchCollection(e.target) }} />
  );
};

export default Input;