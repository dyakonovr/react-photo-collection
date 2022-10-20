import classes from './Collections.module.css';

const Collections = ({ collections, currentCategory }) => {
  // Создаю и заполняю список коллекций
  const collectionsList = collections[currentCategory].map((el, index) => {
    return <div className={classes.collection} key={index}>
      <div className={classes.photo}>
        <img src={el.photos[0]} alt={el.name} />
      </div>
      <div className={classes.photo}>
        <img src={el.photos[1]} alt={el.name} />
      </div>
      <div className={classes.photo}>
        <img src={el.photos[2]} alt={el.name} />
      </div>
      <div className={classes.photo}>
        <img src={el.photos[3]} alt={el.name} />
      </div>
      <strong className={classes.title}>{el.name}</strong>
    </div>
  });
  // Создаю и заполняю список коллекций END

  return (
    <div className={classes.collections}>
      {collectionsList}
    </div>
  );
};

export default Collections;