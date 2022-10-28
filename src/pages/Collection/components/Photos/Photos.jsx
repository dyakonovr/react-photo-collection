import { useRef, useState } from 'react';
import classes from './Photos.module.css';
import Modal from '../Modal/Modal';
import { elementHoverHandle } from '../../../../functions/elementHoverHandle';
import { disableScroll } from '../../../../functions/disableScroll';
import { CSSTransition } from 'react-transition-group';

const Photos = ({ currentCollection }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPhotoID, setCurrentPhotoID] = useState();

  const photosListRef = useRef(null); // Ссылка на лист с фотографиями

  // Создаю массив с фотографиями
  const photosArray = currentCollection.photos.map((el, index) => {
    return (
      <div className={[classes.photo, 'custom-hover'].join(' ')} key={index} onMouseEnter={(e) => elementHoverHandle(e, 'ENTER')} data-id={index}
        onMouseLeave={(e) => elementHoverHandle(e, 'LEAVE', photosListRef.current)} data-focused={false}
        onClick={(e) => { setModalIsOpen(true); setCurrentPhotoID(Number(e.currentTarget.dataset.id)); disableScroll(); }}>
        <img src={el} alt={`Фото ${index + 1}`} />
      </div>
    )
  });
  // Создаю массив с фотографиями END

  return (
    <>
      <div className={classes.wrapper} ref={photosListRef}>
        {photosArray}
      </div>
      <CSSTransition in={modalIsOpen} classNames='alert' timeout={300} unmountOnExit>
        <Modal url={currentCollection.photos[currentPhotoID]} setModalIsOpen={setModalIsOpen} />
      </CSSTransition>

    </>
  );
};

export default Photos;