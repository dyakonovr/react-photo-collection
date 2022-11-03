import { useEffect, useState } from 'react';
import Pages from './pages/Pages';
import Preloader from './pages/Index/components/Preloader/Preloader';
import { PagesContext } from './context/PagesContext';
import './styles/App.css';

function App() {
  const [unfilteredCollections, setUnfilteredCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const collectionsOnPage = 3; // Количество коллекций на одной странице
  const url = 'https://6341ca7920f1f9d79979deb0.mockapi.io/photo_collection_react'; // URL со всеми данными

  // Получаю все фотографии в виде .JSON
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          // Добавляю ID для каждой коллекции
          result[0].collections = result[0].collections.map((el, index) => {
            return { ...el, id: index }
          });
          // Добавляю ID для каждой коллекции END

          setCategories(result[0].categories);
          setUnfilteredCollections(result[0].collections);
          setDataIsLoaded(true);
        },
        (error) => {
          setDataIsLoaded(true);
          setError(error);
        }
      )
  }, [url]);
  // Получаю все фотографии в виде .JSON END
  if (error) { // Если получили ошибку
    return <div style={{ color: 'white' }}>{error}</div> // Выводим её
  } else if (dataIsLoaded) { // Если данные загружены
    return (
      <div className='App'>
        <PagesContext.Provider value={{ unfilteredCollections, categories, collectionsOnPage }}>
          <Pages />
        </PagesContext.Provider>
      </div>
    );
  } else { // Иначе рендерим прелоадер
    return (<Preloader />);
  }
}

export default App;
