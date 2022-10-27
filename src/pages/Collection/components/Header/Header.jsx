import { useContext } from "react";
import { Link } from "react-router-dom"
import { PagesContext } from "../../../../context/PagesContext";
import classes from './Header.module.css';

const Header = ({ currentCollection }) => {
  const { categories, setCurrentCategory } = useContext(PagesContext);

  return (
    <div className={classes.header}>
      <Link to="/" className={classes.link} onClick={() => { setCurrentCategory(currentCollection.category) }}>&larr; Перейти в категорию "{categories[currentCollection.category].name}"</Link>
      <strong className={classes.title}>{currentCollection.name}</strong>
    </div>
  );
};

export default Header;