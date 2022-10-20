import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Pagination from './components/Pagination/Pagination';
import { Categories } from './contexts/Categories';
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
  // Все stat'ы END

  const url = 'https://6341ca7920f1f9d79979deb0.mockapi.io/photo_collection_react';

  // Получаю все фотографии в виде .JSON
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          // Обрабатываю и создаю новый объект со всеми коллекциями вида {номер_коллекции: [коллекция_1, коллекция_2...]}
          let categoriesArrayNew = { '0': result[0].collections }; // В нулевую коллекцию ("Все") добавляем все элементы

          for (let item of result[0].collections) {
            const currCategoryID = item.category;
            categoriesArrayNew[String(currCategoryID)] = categoriesArrayNew[String(currCategoryID)] ? // Если такая категория уже сущетствует в объекте
              [...categoriesArrayNew[currCategoryID], item] // Тогда мы в конец массива добавляем новую коллекцию
              : // Иначе
              [item] // Создаем новый массив с новой коллекцией
          }
          // Обрабатываю и создаю новый объект со всеми коллекциями вида {номер_коллекции: [коллекция_1, коллекция_2...]} END

          setCategories(result[0].categories);
          setCollections(categoriesArrayNew);
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
          <Categories.Provider value={{ categories, currentCategory, setCurrentCategory }}>
            <Header />
          </Categories.Provider>
          <Collections currentCategory={currentCategory} collections={collections} />
          <Pagination />
        </>
        :
        <Preloader />
      }
    </div>
  );
}

export default App;
