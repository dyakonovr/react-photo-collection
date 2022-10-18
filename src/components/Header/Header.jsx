import CategoriesList from '../UI/CategoriesList/CategoriesList';
import Input from '../UI/Input/Input';
import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.wrapper}>
      <CategoriesList />
      <Input />
    </div>
  );
};

export default Header;