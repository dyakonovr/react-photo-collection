import { useContext, useEffect, useState } from 'react';
import { PagesContext } from '../../context/PagesContext';
import { CategoriesContext } from './contexts/CategoriesContext';
import { withErrorBoundary } from "react-error-boundary";
import Header from './components/Header/Header';
import CollectionsList from './components/CollectionsList/CollectionsList';
import AnimationPage from '../AnimationPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import { useParams } from 'react-router-dom';

function Index() {
  // Все stat'ы
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [currentCollections, setCurrentCollections] = useState([]);
  const [searchedCollections, setSearchedCollections] = useState([]);
  const [inputValue, setInputValue] = useState('');
  // Все stat'ы END

  const params = useParams();

  const { categories, unfilteredCollections, collectionsOnPage } = useContext(PagesContext);

  // Получаю все фотографии в виде .JSON
  useEffect(() => {
    if (filteredCollections.length === 0) { // Если объект с обработанными коллекциями ещё не создан
      // Обрабатываю и создаю новый объект со всеми коллекциями вида {номер_коллекции: [коллекция_1, коллекция_2...]}
      let collectionsArrayNew = { '0': unfilteredCollections }; // В нулевую коллекцию ("Все") добавляем все элементы

      for (let item of unfilteredCollections) {
        const currCategoryID = item.category;
        collectionsArrayNew[String(currCategoryID)] = collectionsArrayNew[String(currCategoryID)] ? // Если такая категория уже сущетствует в объекте
          [...collectionsArrayNew[currCategoryID], item] // Тогда мы в конец массива добавляем новую коллекцию
          : // Иначе
          [item] // Создаем новый массив с новой коллекцией
      }
      // Обрабатываю и создаю новый объект со всеми коллекциями вида {номер_коллекции: [коллекция_1, коллекция_2...]} END
      // console.log('нефильтрованные данные', unfilteredCollections);
      // console.log('фильтрованные данные', collectionsArrayNew);

      setFilteredCollections(collectionsArrayNew);
      setCurrentCollections(collectionsArrayNew[params.category_id]); // Текущая коллекция = коллекция текущей категории (по дефолту - "Все")
    } else { // Иначе берём готовый объект
      setCurrentCollections(filteredCollections[params.category_id]);
    }

    // console.log('ОБРАБОТАННЫЕ ДАННЫЕ: ', collectionsArrayNew);
  }, [unfilteredCollections, filteredCollections, params]);
  // Получаю все фотографии в виде .JSON END

  if (filteredCollections.length !== 0) { // Если всё корректно сработало - показываем коллекции
    return (
      <AnimationPage>
        <h1 className='title'>Моя коллекция фотографий</h1>
        <CategoriesContext.Provider value={{
          categories, filteredCollections, currentCollections, setCurrentCollections,
          setSearchedCollections, inputValue, setInputValue
        }}>
          <Header />
        </CategoriesContext.Provider>
        <CollectionsList searchedCollections={searchedCollections} currentCollections={currentCollections}
          collectionsOnPage={collectionsOnPage} />
      </AnimationPage>
    );
  }

}

export default withErrorBoundary(Index, {
  fallback: <ErrorPage />
});
