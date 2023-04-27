import classes from "./load&footer.module.css";
const LoadingP = () => {
  return (
    <div className={`${classes.loadSec}`}>
      <div className={classes.ldsroller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingP;
