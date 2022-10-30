// Реакт-хуки
import { useRef, useState, useContext } from 'react';
// Контексты
import { CollectionContext } from '../../context/CollectionContext';
// Классы
import classes from './Photos.module.css';
// Компоненты
import Modal from '../Modal/Modal';
// Кастомные компоненты
import { CSSTransition } from 'react-transition-group';
// Функции
import { elementHoverHandle } from '../../../../functions/elementHoverHandle';
import { disableScroll } from '../../../../functions/disableScroll';


const Photos = () => {
  const { currentCollection } = useContext(CollectionContext)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPhotoID, setCurrentPhotoID] = useState();
  const photosListRef = useRef(null); // Ссылка на лист с фотографиями

  // Создаю массив с фотографиями
  const photosArray = currentCollection.photos.map((el, index) => {
    return (
      <div className={[classes.photo, 'custom-hover'].join(' ')} key={index} onMouseEnter={(e) => elementHoverHandle(e, 'ENTER')}
        onMouseLeave={(e) => elementHoverHandle(e, 'LEAVE', photosListRef.current)} data-focused={false}
        onClick={(e) => { setModalIsOpen(true); disableScroll(); setCurrentPhotoID(index) }}>
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
        <Modal setModalIsOpen={setModalIsOpen} currentPhotoID={currentPhotoID} />
      </CSSTransition>

    </>
  );
};

export default Photos;