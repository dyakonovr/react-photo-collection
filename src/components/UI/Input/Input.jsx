import classes from './Input.module.css';

const Input = () => {
  return (
    <input type="text" className={classes.input} placeholder="Найти категорию.."/>
  );
};

export default Input;