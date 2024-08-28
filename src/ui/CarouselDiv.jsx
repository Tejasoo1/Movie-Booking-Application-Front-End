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

import Axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import store from "../../store";
import { useDispatch } from "react-redux";
import { updateSelectedMovie } from "../components/movieSlice";

function CarouselDiv() {
  const [images, setImages] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  console.log({ images });
  console.log({ isloading });
  console.log("CarouselDiv component");
  // console.log(store.getState());

  const dispatch = useDispatch();

  const moviesArr = store.getState().movies?.movieDetails;
  console.log({ moviesArr });

  useEffect(() => {
    async function getImages(imgLimit) {
      try {
        setIsLoading(true);
        const result = await Axios.get(
          `https://jsonplaceholder.typicode.com/photos?_limit=${imgLimit}`,
        );
        console.log({ result: result.data });
        setImages(result.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getImages(8);
  }, []);

  function handleImgClick(movieDetailObj) {
    console.log({ movieDetailObj });
    dispatch(updateSelectedMovie(movieDetailObj));
  }

  /* style={{ height: "60vh" }} */
  return (
    <div style={{ height: "70vh" }}>
      <Carousel
        // images={images}.
        images={moviesArr}
        isloading={isloading}
        onImgClick={handleImgClick}
        // imgPerSlide={3}
        // imageLimit={4}
        // customNextButton={(click) => <button onClick={click} className={`${styles.btn} ${styles.prev}`}
        //                               style={{color: "red"}}>...</button>}
      />
    </div>
  );
}

export default CarouselDiv;
