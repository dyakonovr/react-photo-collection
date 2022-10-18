import classes from './Pagination.module.css';

const Pagination = () => {
  return (
    <ul className={classes.list}>
      <li className={classes.page}>1</li>
      <li className={classes.page}>2</li>
      <li className={classes.page}>3</li>
    </ul>
  );
};

export default Pagination;