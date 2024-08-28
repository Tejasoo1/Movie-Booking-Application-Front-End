/*
  ^ Logic to connect frontend App. with backend application:-
  
  1] To which endpoint i want to connect:-
     http://localhost:5000/fetch/all/movies
              |           |
              |           |--> API endpoint  
              |
              |--> This backend application is running in your computer(local server) 
                   at port number 5000. 

  2] npm i axios --> Library used to fetch the data from an API.
  3] This endpoint "/fetch/all/movies" is associated with 'get' method.
     
     SO,
     Axios.get("http://localhost:5000/fetch/all/movies")

  4] Now an error occurs:-
     Access to XMLHttpRequest at 'http://localhost:5000/fetch/all/movies' from origin 
    'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
     header is present on the requested resource.   

------------------------------------------------------------------------------------------------------------      
?   Q. What is CORS & Why do we get this error?
 --> 1] CORS (Cross Origin Request Sharing).
     2] React Application is running at Port No. 5173 & React application is connecting with
        backend Application which is running at Port No. 5000.
        
     3] When one application running at one port number, is trying to communicate with
        one more application running at another port number, then that communication
        between them will not be directly possible.
        
        That error only we call it as "CORS".

     4] Your React application is trying to send a request, to an application running at
        different port number.
        
 ~ Now if we want to handle the 'CORS' error, then we should use one library:- cors
   Now once i install this 'cors' library then this problem/error will be solved.
 ^ So to make that communication happen, we'll use 'cors' library.  
   
?   Q. Now in which application you need to install this library ?
---> To which application you are getting connected, always in that application you have
     to install "cors".
     
     So in backend application you need to install this "cors" library.
     (npm i cors)                 

*/
import Axios from "axios";
import { useEffect, useState } from "react";
import MoviItem from "./MoviItem";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { updateMovieDetails } from "./movieSlice";

function Movies({ loginDetails, onSetMovie }) {
  // const [movieDetails, setMovieDetails] = useState([]);

  console.log("Movies component");
  const dispatch = useDispatch();

  const { movieDetails } = useSelector((state) => state.movies);
  const { signInData, isAuthenticated } = useSelector(
    (state) => state.userInfo,
  );

  //Accessing LocalStorage
  const userInfo = JSON.parse(localStorage.getItem("signInData"));
  console.log({ userInfo });

  console.log({ movieDetails });

  useEffect(() => {
    console.log("useEffect-1 Movies");
    Axios.get(
      "https://movies-booking-application-back-end.onrender.com/fetch/all/movies",
    )
      .then((output) => {
        console.log(output);
        // setMovieDetails(output.data);
        dispatch(updateMovieDetails(output.data));
      })
      .catch((err) => console.log(err));

    // Axios.get("http://localhost:5000/fetch/all/movies")
    //   .then((output) => {
    //     console.log(output);
    //     dispatch(updateMovieDetails(output.data));
    //   })
    //   .catch((err) => console.log(err));
  }, [movieDetails.length]);

  useEffect(() => {
    if (Object.keys(userInfo || {}).length === 0) {
      localStorage.setItem(
        "signInData",
        JSON.stringify({ ...signInData, isAuthenticated }),
      );
    }
  }, []);

  return (
    <>
      <Navbar />
      {signInData?.email || userInfo?.email ? (
        <p
          style={{ textAlign: "center", fontWeight: "600", color: "blue" }}
        >{`Welcome, ${signInData.email} to Movie Booking Application`}</p>
      ) : (
        <p>No user Data Available</p>
      )}
      {movieDetails.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            marginTop: "20px",
            gap: "15px",
            padding: "20px",
          }}
        >
          {movieDetails.map((movie) => (
            <MoviItem key={movie.id} movie={movie} onSetMovie={onSetMovie} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Movies;
