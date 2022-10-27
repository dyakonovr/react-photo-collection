import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from './contexts/CategoriesContext';
import { CollectionsContext } from './contexts/CollectionsContext';
import Preloader from './components/Preloader/Preloader';
import Header from './components/Header/Header';
import CollectionsList from './components/CollectionsList/CollectionsList';
import { PagesContext } from '../../context/PagesContext';

function Index() {
  // Все stat'ы
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [currentCollections, setCurrentCollections] = useState([]);
  const [searchedCollections, setSearchedCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  // Все stat'ы END

  const { categories, unfilteredCollections, collectionsOnPage, dataIsLoaded, currentCategory, setCurrentCategory } = useContext(PagesContext);

  // Получаю все фотографии в виде .JSON
  useEffect(() => {
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

    setFilteredCollections(collectionsArrayNew);
    setCurrentCollections(collectionsArrayNew[String(currentCategory)]); // Текущая коллекция = коллекция текущей категории (по дефолту - "Все")

    // console.log('ОБРАБОТАННЫЕ ДАННЫЕ: ', collectionsArrayNew);
  }, [unfilteredCollections, currentCategory]);
  // Получаю все фотографии в виде .JSON END

  return (
    <>
      <h1 className='title'>Моя коллекция фотографий</h1>
      {dataIsLoaded // Если данные получены и установлены в state
        ? // Рендерим <Header />
        <>
          <CategoriesContext.Provider value={{
            categories, filteredCollections, currentCategory, setCurrentCategory, currentCollections, setCurrentCollections,
            setSearchedCollections, currentPage, setCurrentPage, inputValue, setInputValue
          }}>
            <Header />
          </CategoriesContext.Provider>

          <CollectionsContext.Provider value={{ currentPage, setCurrentPage }}>
            <CollectionsList searchedCollections={searchedCollections} currentCollections={currentCollections}
              collectionsOnPage={collectionsOnPage} />
          </CollectionsContext.Provider>
        </>
        : // Иначе рендерим <Preloader />
        <Preloader />
      }
    </>
  );

}

export default Index;
