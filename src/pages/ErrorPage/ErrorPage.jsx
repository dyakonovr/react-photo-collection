import classes from './ErrorPage.module.css';
import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Ой, Ой, ОЙ-ОЙ-ОЙ</h1>
      <div className={classes.wrapper}>
        <p className={classes.descr}>Что-то пошло не так.</p>
        <Link to="/collections" className={classes.link}>Может вернёмся на начальную страницу?</Link>
      </div>
    </div>
  );
};

export default ErrorPage;