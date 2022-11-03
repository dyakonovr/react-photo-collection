import { useContext } from "react";
import { Link } from "react-router-dom";
import { PagesContext } from "../../../../context/PagesContext";
import { CollectionContext } from "../../context/CollectionContext";
import classes from './Header.module.css';

const Header = () => {
  const { currentCollection } = useContext(CollectionContext);
  const { categories } = useContext(PagesContext);

  return (
    <div className={classes.header}>
      <Link to={`/collections/?category=0&page=1`} className={classes.link}>&larr;&nbsp;Перейти в категорию "{categories['0'].name}"</Link>
      <strong className={classes.title}>{currentCollection.name}</strong>
      <Link to={`/collections/?category=${currentCollection.category}&page=1`} className={classes.link}>
        Перейти в категорию "{categories[currentCollection.category].name}"&nbsp;&rarr;
      </Link>
    </div>
  );
};

export default Header;