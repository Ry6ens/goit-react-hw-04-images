import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';

import styles from './Loader.module.scss';

const Loader = ({ loader }) => {
  return (
    <div className={styles.threedots}>
      <ThreeDots
        height="40"
        width="40"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={loader}
      />
    </div>
  );
};

export default Loader;

Loader.propTypes = {
  loader: PropTypes.bool.isRequired,
};
