import styles from "./App.module.scss";

import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";

import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const getSearch = (search) => {
    setPage(1);
    setSearch(search);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={styles.App}>
      <Searchbar getSearch={getSearch} />
      <ImageGallery
        query={search}
        handleLoadMore={handleLoadMore}
        page={page}
      />
    </div>
  );
}
