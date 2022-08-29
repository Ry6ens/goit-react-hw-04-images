import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const Button = ({ onClickLoadMore }) => {
  return (
    <button type="button" className={styles.btn} onClick={onClickLoadMore}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClickLoadMore: PropTypes.func.isRequired,
};
