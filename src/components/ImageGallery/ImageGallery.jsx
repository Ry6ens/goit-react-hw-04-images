import styles from "./ImageGallery.module.scss";

import { useState, useEffect } from "react";
import Notiflix from "notiflix";

import { searchPosts } from "../../shared/api/posts";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import PropTypes from "prop-types";

export default function ImageGallery({ search }) {
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (search) {
      fetchData();
    }

    async function fetchData() {
      try {
        setLoader(true);
        const data = await searchPosts(search, page);
        console.log(data.totalHits);
        if (data.totalHits > 0) {
          setItems([...data.hits]);
          setPage(1);
          return;
        }
        Notiflix.Notify.warning("No hits. Try again");
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    }
  }, [search]);

  useEffect(() => {
    if (page !== 1) {
      fetchData();
    }

    async function fetchData() {
      try {
        setLoader(true);
        const data = await searchPosts(search, page);
        setItems([...items, ...data.hits]);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const getModalImage = (showModal) => {
    setShowModal(showModal);
  };

  const isItems = Boolean(items.length);

  return (
    <>
      <ul className={styles.ImageList}>
        <ImageGalleryItem items={items} onClickImage={getModalImage} />
      </ul>

      <Loader loader={loader} />

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
  search: PropTypes.string.isRequired,
};

// useEffect(() => {
//   if (search) {
//     async function fetchData() {
//       try {
//         setLoader(true);
//         const data = await searchPosts(search, page);
//         setItems([...data.hits]);
//         setPage(1);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoader(false);
//       }
//     }

//     fetchData();
//   }

//   if (page !== 1) {
//     fetchData();

//     async function fetchData() {
//       try {
//         setLoader(true);
//         const { data } = await searchPosts(search, page);
//         setItems([...items, ...data.hits]);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoader(false);
//       }
//     }
//   }
// }, [search, page]);
