import { useEffect, useState } from 'react';
import { CategoriesContext } from './contexts/CategoriesContext';
import { CollectionsContext } from './contexts/CollectionsContext';
import Preloader from './components/Preloader/Preloader';
import Header from './components/Header/Header';
import Collections from './components/Collections/Collections';
import './styles/App.css';

function App() {
  // Все stat'ы
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [error, setError] = useState();
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentCollections, setCurrentCollections] = useState([]);
  const [searchedCollections, setSearchedCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  // Все stat'ы END

  const collectionsOnPage = 3; // Количество коллекций на одной странице
  const url = 'https://6341ca7920f1f9d79979deb0.mockapi.io/photo_collection_react';

  // Получаю все фотографии в виде .JSON
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          // Обрабатываю и создаю новый объект со всеми коллекциями вида {номер_коллекции: [коллекция_1, коллекция_2...]}
          let collectionsArrayNew = { '0': result[0].collections }; // В нулевую коллекцию ("Все") добавляем все элементы

          for (let item of result[0].collections) {
            const currCategoryID = item.category;
            collectionsArrayNew[String(currCategoryID)] = collectionsArrayNew[String(currCategoryID)] ? // Если такая категория уже сущетствует в объекте
              [...collectionsArrayNew[currCategoryID], item] // Тогда мы в конец массива добавляем новую коллекцию
              : // Иначе
              [item] // Создаем новый массив с новой коллекцией
          }
          // Обрабатываю и создаю новый объект со всеми коллекциями вида {номер_коллекции: [коллекция_1, коллекция_2...]} END

          setCategories(result[0].categories);
          setCollections(collectionsArrayNew);
          setCurrentCollections(collectionsArrayNew['0']);
          setDataIsLoaded(true);

          console.log('ВСЕ ДАННЫЕ: ', collectionsArrayNew);
        },
        (error) => {
          setDataIsLoaded(true);
          setError(error);
        }
      )
  }, [url]);
  // Получаю все фотографии в виде .JSON

  if (error) { // Если ошибка
    return <div style={{ color: 'white' }}>{error}</div> // Показать текст ошибки
  } else { // Иначе зарендерить приложение
    return (
      <div className="App">
        <h1 className='title'>Моя коллекция фотографий</h1>
        {dataIsLoaded // Если данные получены и установлены в state
          ? // Рендерим <Header />
          <>
            <CategoriesContext.Provider value={{
              categories, collections, currentCategory, setCurrentCategory, collectionsOnPage,
              currentCollections, setCurrentCollections, setSearchedCollections, currentPage, setCurrentPage,
              inputValue, setInputValue
            }}>
              <Header />
            </CategoriesContext.Provider>

            <CollectionsContext.Provider value={{ currentPage, setCurrentPage }}>
              <Collections searchedCollections={searchedCollections} currentCollections={currentCollections}
                collectionsOnPage={collectionsOnPage} />
            </CollectionsContext.Provider>
          </>
          : // Иначе рендерим <Preloader />
          <Preloader />
        }
      </div>
    );
  }
}

export default App;
