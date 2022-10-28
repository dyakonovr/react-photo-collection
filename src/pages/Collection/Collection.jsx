import { useContext } from "react";
import { PagesContext } from "../../context/PagesContext";
import Header from './components/Header/Header';
import Photos from "./components/Photos/Photos";
import AnimationPage from "../AnimationPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import { withErrorBoundary } from "react-error-boundary";

const Collection = () => {
  const { currentCollectionID, unfilteredCollections } = useContext(PagesContext);

  const currentCollection = unfilteredCollections[currentCollectionID];

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