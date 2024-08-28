import { useEffect } from "react";
import styles from "./MovieDetails.module.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CarouselDiv from "../ui/CarouselDiv";

/*
 1] We will have some locations.
    For Each location, we will have theaters. 
    Each theater will have some timings.

 2]   [
         {
            location: "Pune",
            theaters: [ 
              {
                theaterName: "INOX Pimpri",
                shows: [
                   {movie_name: "Deadpool 3", time: ["7:00 AM", "9:30 AM", "1:00 PM"]}
                   {movie_name: "Kalki" ,time: ["6:00 AM", "9:30 AM", "6:00 PM"]}
                   {movie_name: "Typhoon", time: ["8:00 AM", "11:30 AM", "2:00 PM"]} 
                  ]            
              },
              {...} ...so on
            ]
         },
         {...} ...so on
      ] 
 
 
*/

function MovieDetails() {
  console.log("MovieDetails");

  //Accessing the Redux Store
  const { selectedMovie: movieDetail } = useSelector((state) => state.movies);

  const parsedMovie = JSON.parse(localStorage.getItem("movie"));
  console.log({ parsedMovie });

  const fetchedMovie = movieDetail?.id ? movieDetail : parsedMovie;

  console.log({ fetchedMovie });
  const navigate = useNavigate();

  useEffect(() => {
    if (parsedMovie?.id && !movieDetail?.id) return;

    if (parsedMovie?.id === !movieDetail?.id) return;

    console.log("useEffect MovieDetails");
    localStorage.setItem("movie", JSON.stringify(movieDetail));
  }, []);

  if (!fetchedMovie) {
    return <p>No Movie Details Available at the Moment !!!</p>;
  }

  function handleLocationAndTheater() {
    navigate("/locationandtheater");
  }

  return (
    <>
      <Navbar />
      <div
        className={styles.movieDetails}
        style={{
          backgroundImage: `linear-gradient(to right, #00000099, #00000070), url(${fetchedMovie.image_url})`,
          backgroundSize: "cover", // Ensure the image covers the element
          backgroundPosition: "center", // Center the image
        }}
      >
        <div className={styles.posterSection}>
          <img
            src={fetchedMovie.image_url}
            alt={fetchedMovie.movie_name}
            className={styles.poster}
          />
        </div>
        <div className={styles.detailsSection}>
          <h1 className={styles.title}>{fetchedMovie.movie_name}</h1>
          <div className={styles.ratingContainer}>
            <span>{`⭐ ${fetchedMovie?.rating}/10  `}</span>
            <button>Rate now</button>
          </div>
          <p className={styles.description}>
            {fetchedMovie.theaters.join(", ")}
          </p>
          <p className={styles.language}>English, Hindi, Tamil, Telugu</p>
          <div className={styles.subDetails}>
            <p>
              {fetchedMovie.movie_length} ・{" "}
              {fetchedMovie.genre?.split("/")?.join(", ")} ・
              {fetchedMovie.censor}
            </p>
            <p>Director: {fetchedMovie.director}</p>
            {/* <p>Cast: {fetchedMovie.cast?.join(', ')}</p> */}
          </div>
          <button
            onClick={handleLocationAndTheater}
            className={styles.bookButton}
          >
            Book tickets
          </button>
        </div>
      </div>
      <div className={styles.movieDetail}>
        <p className={styles.descriptionTitle}>About the movie</p>
        <p className={styles.descriptionContent}>{movieDetail.description}</p>
        <p className={styles.descriptionTitle}>Cast: </p>
        <p>{fetchedMovie.cast?.join(", ")}</p>
      </div>
      <p className={styles.carouselText}>You might also Like:-</p>
      <CarouselDiv />
    </>
  );
}

export default MovieDetails;
