import { useContext } from "react";
import { PagesContext } from "../../context/PagesContext";
import Header from './components/Header/Header';
import Photos from "./components/Photos/Photos";
import AnimationPage from "../AnimationPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import { withErrorBoundary } from "react-error-boundary";
import { useParams } from 'react-router-dom';

const Collection = () => {
  const params = useParams(); // Параметры из ссылки на страницу

  const { unfilteredCollections } = useContext(PagesContext);

  const currentCollection = unfilteredCollections[params.id];

  return (
    <AnimationPage>
      <Header currentCollection={currentCollection} />
      <Photos currentCollection={currentCollection} />
    </AnimationPage>
  );
};

export default withErrorBoundary(Collection, {
  fallback: <ErrorPage />
});