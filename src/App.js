import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import { Context } from './contexts/Context';
import Collections from './components/Collections/Collections';
import './styles/App.css';
import Preloader from './components/Preloader/Preloader';

function App() {
  // Все stat'ы
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [error, setError] = useState();
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentCollections, setCurrentCollections] = useState([]);
  const [searchedCollections, setSearchedCollections] = useState([]);
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

          // Создаю "страницы" в новом обработанном массиве коллекций
          for (let key of Object.keys(collectionsArrayNew)) {
            // Если кол-во коллекций конкретной категории, деленных на collectionsOnPage >, чем одна = страниц больше, чем одна
            if (collectionsArrayNew[key].length / collectionsOnPage > 1) {
              // Создаю вспомогательный массив
              let collectionsByPage = [];
              for (let i = 0; i < collectionsArrayNew[key].length; i++) {
                // Если коллекция должна быть на след. странице
                if ((i / collectionsOnPage) === Math.ceil(i / collectionsOnPage)) {
                  // Создаём новую страницу и добавляем её туда
                  collectionsByPage.push([collectionsArrayNew[key][i]]);
                }
                // Иначе
                else {
                  // Добавляем её в массив конкретной страницы
                  collectionsByPage[collectionsByPage.length - 1].push(collectionsArrayNew[key][i]);
                }
              }
              // Обновляем отсортированный по старницам массив в объекте всех коллекций
              collectionsArrayNew[key] = collectionsByPage;
            } else { // Если страница будет только одна
              collectionsArrayNew[key] = [collectionsArrayNew[key]] // То по дефолту добавляю первую страницу для правильного рендера
            }
          }
          // Создаю "страницы" в новом обработанном массиве коллекций END

          setCategories(result[0].categories);
          setCollections(collectionsArrayNew);
          setCurrentCollections(collectionsArrayNew['0']);
          setDataIsLoaded(true);
        },
        (error) => {
          setDataIsLoaded(true);
          setError(error);
        }
      )
  }, [url]);
  // Получаю все фотографии в виде .JSON

  return (
    <div className="App">
      <h1 className='title'>Моя коллекция фотографий</h1>
      {dataIsLoaded
        ?
        <>
          <Context.Provider value={{
            categories, collections, currentCategory, setCurrentCategory,
            currentCollections, setCurrentCollections, setSearchedCollections
          }}>
            <Header />
          </Context.Provider>
          <Collections currentCollections={currentCollections} searchedCollections={searchedCollections} collectionsOnPage={collectionsOnPage} />
        </>
        :
        <Preloader />
      }
    </div>
  );
}

export default App;
