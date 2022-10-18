import { useEffect, useState } from 'react';
import Photos from './components/Photos/Photos';
import Header from './components/Header/Header';
import Pagination from './components/Pagination/Pagination';
import { Categories } from './contexts/Categories';
import './styles/App.css';

function App() {
  // Все stat'ы
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [error, setError] = useState();
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  // Все stat'ы END

  const url = 'https://6341ca7920f1f9d79979deb0.mockapi.io/photo_collection_react';

  // Получаю все фотографии в виде .JSON
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setCategories(result[0].categories);
          setCollections(result[0].collections);
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
      <Categories.Provider value={categories}>
        <Header categories={categories} />
      </Categories.Provider>
      <Photos />
      <Pagination />
    </div>
  );
}

export default App;
