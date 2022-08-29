import styles from './ImageGalleryItem.module.scss';

import { nanoid } from 'nanoid';
import { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  state = {};

  getLargeImage = e => {
    this.props.onClickImage(e.target.dataset.image);
  };

  render() {
    const { getLargeImage } = this;
    const { items } = this.props;

    return items.map(({ id, webformatURL, largeImageURL, tags }) => {
      return (
        <li className={styles.ImageGalleryItem} id={id} key={nanoid()}>
          <img
            src={webformatURL}
            data-image={largeImageURL}
            alt={tags}
            className={styles.ImageGalleryItemImage}
            onClick={getLargeImage}
          />
        </li>
      );
    });
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
