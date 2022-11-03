// Реакт-хуки
import { useContext } from "react";
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id")); // Получил ID текущей коллекции

  const { unfilteredCollections } = useContext(PagesContext);

  const currentCollection = unfilteredCollections[id];

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