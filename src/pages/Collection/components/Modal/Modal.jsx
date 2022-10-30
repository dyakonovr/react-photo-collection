// Функции
import { enableScroll } from '../../../../functions/enableScroll';
// Реакт-хуки
import { useContext } from 'react';
// Классы
import classes from './Modal.module.css';
// Контексты
import { CollectionContext } from '../../context/CollectionContext';

const Modal = ({ setModalIsOpen, currentPhotoID }) => {
  const { currentCollection } = useContext(CollectionContext);
  const photoURL = currentCollection.photos[currentPhotoID];

  return (
    <div className={[classes.modal, 'modal'].join(' ')} onClick={(e) => {
      if (e.target.classList.contains('modal')) { // Если мы кликнули вне модального окна
        setModalIsOpen(false); enableScroll(); // Закрываем его
      }
    }}>
      <div className={classes.wrapper}>
        <button className={classes.btn_close} onClick={() => { setModalIsOpen(false); enableScroll() }}>&#10006;</button>
        <img src={photoURL} alt="Приближенное фото" />
      </div>
    </div>
  );
};

export default Modal;