// Реакт-хуки
import { useContext } from "react";
import { useParams } from 'react-router-dom';
// Контексты
import { PagesContext } from "../../context/PagesContext";
import { CollectionContext } from './context/CollectionContext';
// Компоненты
import Header from './components/Header/Header';
import Photos from "./components/Photos/Photos";
import AnimationPage from "../AnimationPage";
import ErrorPage from "../ErrorPage/ErrorPage";
// Кастомные функции
import { withErrorBoundary } from "react-error-boundary";

const Collection = () => {
  const params = useParams(); // Параметры из ссылки на страницу

  const { unfilteredCollections } = useContext(PagesContext);

  const currentCollection = unfilteredCollections[params.id];

  return (
    <AnimationPage>
      <CollectionContext.Provider value={{ currentCollection }}>
        <Header />
        <Photos />
      </CollectionContext.Provider>
    </AnimationPage>
  );
};

export default withErrorBoundary(Collection, {
  fallback: <ErrorPage />
});