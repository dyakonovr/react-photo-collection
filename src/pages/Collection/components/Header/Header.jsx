import { useContext } from "react";
import { Link } from "react-router-dom";
import { PagesContext } from "../../../../context/PagesContext";
import classes from './Header.module.css';

const Header = ({ currentCollection }) => {
  const { categories, setCurrentCategory } = useContext(PagesContext);

  return (
    <div className={classes.header}>
      <Link to="/" className={classes.link} onClick={() => { setCurrentCategory(0) }}>&larr; Перейти в категорию "{categories['0'].name}"</Link>
      <strong className={classes.title}>{currentCollection.name}</strong>
      <Link to="/" className={classes.link} onClick={() => { setCurrentCategory(currentCollection.category) }}>Перейти в категорию "{categories[currentCollection.category].name}" &rarr;</Link>
    </div>
  );
};

export default Header;