import React, { useState, useEffect } from "react";
import PhotoContainer from "./photoContainer";
import { debounce } from "./debounce";

function DynamicLoading({ photos }) {
  const [images, setImages] = useState(photos.slice(0, 10));
  const [pageNum, setPageNum] = useState(1);
  
  const loadMorePhotos = debounce(() => {
    // Add chek if end callBack or Redux  
    setImages(images.concat(photos.slice(images.length, images.length + 10)));
    setPageNum(pageNum + 1);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    setImages(photos.slice(0, 10));
  }, [photos]);

  const handleScroll = () => {
    let scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
      loadMorePhotos();
    }
  };

  return (
    <div>
      <PhotoContainer photos={images} direction={"column"} />
    </div>
  );
}

export default DynamicLoading;
