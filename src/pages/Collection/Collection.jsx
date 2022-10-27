import { useContext } from "react";
import { PagesContext } from "../../context/PagesContext";
import Header from './components/Header/Header';
import Photos from "./components/Photos/Photos";

const Collection = () => {
  const { currentCollectionID, unfilteredCollections } = useContext(PagesContext);

  const currentCollection = unfilteredCollections[currentCollectionID];

  return (
    <>
      <Header currentCollection={currentCollection} />
      <Photos currentCollection={currentCollection} />
    </>
  );
};

export default Collection;