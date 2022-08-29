import styles from "./App.module.scss";

import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";

import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState("");

  const getSearch = (search) => {
    setSearch(search);
  };

  return (
    <div className={styles.App}>
      <Searchbar getSearch={getSearch} />
      <ImageGallery search={search} />
    </div>
  );
}
