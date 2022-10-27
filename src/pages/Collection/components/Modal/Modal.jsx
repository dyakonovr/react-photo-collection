import { enableScroll } from '../../../../functions/enableScroll';
import classes from './Modal.module.css';

const Modal = ({ url, setModalIsOpen }) => {

  return (
    <div className={classes.modal}>
      <div className={classes.wrapper}>
        <button className={classes.btn_close} onClick={() => { setModalIsOpen(false); enableScroll(); }}>&#10006;</button>
        <img src={url} alt="Приближенное фото" />
      </div>
    </div>
  );
};

export default Modal;