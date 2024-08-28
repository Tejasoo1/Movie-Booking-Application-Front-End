/*
1] This Carousel component should be highly Scalable, highly Reusable.
  
    API structure:-
     
     const [loading, isLoading] = useState(false);
                 
     <Carousel 
       images={[]} -------------> An array of images or objects.
       isLoading={loading}
       imgPerSlide={} 
       imageLimit={}  ----------> How many images to be displayed in the carousel.
       customNextButton={""}
       customPrevButton={""}  
     />
   
2] https://jsonplaceholder.typicode.com/photos?_limit=8 --> An API end point, from where you will get
                                                            an array of image objects. 

*/

import { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";

/*
1] We need to calculate the width for each image, as image's width will be dynamic.
2] 

*/

function Carousel({
  images = [],
  isloading = false,
  imageLimit = images.length, // |----> How many images should be rendered at once.
  imgPerSlide = 3,
  defaultInd = 0,
  onImgClick = () => {},
  customNextButton,
  customPrevButton,
}) {
  const [currIndex, setCurrIndex] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const imgRef = useRef(null);
  console.log("Carousel component");
  console.log({ imgWidth });
  console.log({ currIndex });
  console.log({ images });

  let imagesCount = (imageLimit - 1) / imgPerSlide;
  console.log(imagesCount);

  function goToPrev() {
    setCurrIndex((prevIndex) =>
      // prevIndex === 0 ? images.length - 1 : prevIndex - 1,
      // prevIndex === 0 ? imageLimit - 1 : prevIndex - 1,
      prevIndex === 0 ? Math.floor(imagesCount) : prevIndex - 1,
    );
  }

  function goToNext() {
    setCurrIndex((prevIndex) =>
      // prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      // prevIndex === imageLimit - 1 ? 0 : prevIndex + 1,
      prevIndex === Math.floor(imagesCount) ? 0 : prevIndex + 1,
    );
  }

  useEffect(() => {
    if (images.length > 0) {
      setCurrIndex(defaultInd);
    }
  }, [images.length]);

  console.log({ imgRef });
  // console.log(imgRef?.current?.offsetWidth);

  useEffect(() => {
    setImgWidth(imgRef?.current?.offsetWidth);
  }, []);

  /*
   1] The overflow: 'visible' on the outer div allows the buttons to overflow outside of the carousel 
      without being cut off.
  
  */

  return isloading ? (
    <div>Loading...</div>
  ) : (
    <div className={styles.carouselOuterDiv}>
      <div
        className={styles.carousel}
        style={{ width: `${280 * imgPerSlide}px` }}
        // style={{ width: `${imgWidth * imgPerSlide}px` }}
      >
        <div
          className={styles.imagecontainer}
          style={{
            transform: `translateX(-${currIndex * imgPerSlide * imgWidth}px)`,
          }}
        >
          {images
            .slice(0, imageLimit > images.length ? images.length : imageLimit)
            .map((image, ind) => {
              return (
                <img
                  onLoad={() => setImgWidth(imgRef?.current?.offsetWidth)}
                  key={image.id}
                  className={styles.imageStyle}
                  src={image.image_url}
                  alt={image.movie_name}
                  ref={imgRef}
                  onClick={() => onImgClick(image, ind)}
                />
              );
            })}
        </div>
        {customPrevButton instanceof Function ? (
          customPrevButton(goToPrev)
        ) : (
          <button className={`${styles.btn} ${styles.prev}`} onClick={goToPrev}>
            Prev
          </button>
        )}
        {customNextButton instanceof Function ? (
          customNextButton(goToNext)
        ) : (
          <button className={`${styles.btn} ${styles.next}`} onClick={goToNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Carousel;
