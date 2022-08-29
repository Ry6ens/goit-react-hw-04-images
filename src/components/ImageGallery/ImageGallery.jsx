import styles from "./ImageGallery.module.scss";

import { useState, useEffect } from "react";
import Notiflix from "notiflix";

import { searchPosts } from "../../shared/api/posts";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import PropTypes from "prop-types";

export default function ImageGallery({ query, page, handleLoadMore }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query) {
      fetchData();
    }

    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await searchPosts(query, page);
        if (data.totalHits > 0) {
          setItems([...data.hits]);
          return;
        }
        Notiflix.Notify.warning("No hits. Try again");
      } catch (error) {
        Notiflix.Notify.failure(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (page !== 1) {
      fetchData();
    }

    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await searchPosts(query, page);
        setItems([...items, ...data.hits]);
      } catch (error) {
        Notiflix.Notify.failure(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getModalImage = (showModal) => {
    setShowModal(showModal);
  };

  const isItems = Boolean(items.length);

  return (
    <>
      <Loader loader={isLoading} />

      <ul className={styles.ImageList}>
        <ImageGalleryItem items={items} onClickImage={getModalImage} />
      </ul>

      {isItems && <Button onClickLoadMore={handleLoadMore} />}

      {showModal && (
        <Modal onClose={getModalImage}>
          <img src={showModal} alt="img" />
        </Modal>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
