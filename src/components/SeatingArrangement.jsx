import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import styles from "./SeatingArrangement.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Seats from "./Seats";
import { updateTime } from "./locationsAndTheatersSlice";

function SeatingArrangement() {
  console.log("SeatingArrangement component");
  console.log(store.getState());

  const dispatch = useDispatch();

  //Getting 'locationAndTheaterCopy' & 'moviesCopy' from the store.
  const locationAndTheaterCopy = store.getState().locationAndTheater;
  const moviesCopy = store.getState().movies;

  //Accessing that copy if it exists from localstorage.
  const parsedLocationsData =
    JSON.parse(localStorage.getItem("seatsPageInfo")) || {};
  const parsedMoviesData =
    JSON.parse(localStorage.getItem("moviesPageInfo")) || {};

  console.log(parsedLocationsData);
  console.log(parsedMoviesData);

  //Accessing from the store.
  /*
     const { currLocation, currDates, selectedTime, selectedTheater, NoOfSeats } =
      parsedLocationsData || useSelector((state) => state.locationAndTheater);

     const { selectedMovie } =
       parsedMoviesData || useSelector((state) => state.movies);
  */

  // Call useSelector at the top level, outside of any conditionals
  const locationAndTheater = useSelector((state) => state.locationAndTheater);
  const movies = useSelector((state) => state.movies);

  console.log({ locationAndTheater });
  console.log({ movies });

  // Then, use the values conditionally
  const currLocation =
    locationAndTheater?.currLocation || parsedLocationsData?.currLocation;

  const currDates = locationAndTheater?.currDates.length
    ? locationAndTheater?.currDates
    : parsedLocationsData?.currDates;

  const selectedTime =
    locationAndTheater?.selectedTime || parsedLocationsData?.selectedTime;

  const selectedTheater =
    Object.keys(locationAndTheater?.selectedTheater).length > 0
      ? locationAndTheater?.selectedTheater
      : parsedLocationsData?.selectedTheater;

  const NoOfSeats =
    locationAndTheater?.NoOfSeats || parsedLocationsData?.NoOfSeats;

  let selectedMovie =
    Object.keys(movies.selectedMovie).length > 0
      ? movies.selectedMovie
      : parsedMoviesData?.selectedMovie;

  if (selectedMovie) {
    console.log(JSON.parse(localStorage.getItem("movie")));
    selectedMovie = JSON.parse(localStorage.getItem("movie"));
  }

  //Derived State.
  const currActiveDateObj = currDates?.find((curr) => curr.active);
  console.log({ currActiveDateObj });

  //This date format needed to find currShowTimes
  const currDate =
    currActiveDateObj.month + " " + currActiveDateObj.date + " " + "2024";

  //This date format for displaying in the UI.
  const currActiveDate = currActiveDateObj.date + " " + currActiveDateObj.month;

  console.log(currActiveDate);

  //Derived states
  const currShowTimes = selectedTheater.showDates?.find(
    (curr) => curr.date === currDate,
  )?.showTimes;

  console.log({ currShowTimes });
  console.log({ selectedTime });
  console.log({ selectedMovie });

  //is Adult or Not
  const isRatedR = selectedMovie?.censor === "PG-13";

  const navigate = useNavigate();
  function handleClose() {
    navigate(-1);
  }

  //useEffect for local storage.
  useEffect(() => {
    if (Object.keys(parsedLocationsData).length === 0) {
      localStorage.setItem(
        "seatsPageInfo",
        JSON.stringify(locationAndTheaterCopy),
      );
    }

    if (Object.keys(parsedMoviesData).length === 0) {
      localStorage.setItem("moviesPageInfo", JSON.stringify(moviesCopy));
    }
  }, []);

  function handleShowTime(currTime, currTheater) {
    console.log({ currTime });
    console.log({ currTheater });
    dispatch(updateTime(currTime));
  }

  return (
    <div>
      <header className={styles.headerContainer}>
        <div className={styles.mainHeader}>
          <div className={styles.bookingInfo}>
            <p>
              {selectedMovie?.movie_name} | {selectedMovie?.censor}
            </p>
            <div className={styles.bottomInfo}>
              <p>
                {selectedTheater?.theaterName} {currLocation},
              </p>
              <p>
                {currActiveDate}, {selectedTime}
              </p>
            </div>
          </div>
          <div className={styles.seatInfo}>
            <button className={styles.seatInfoBtn}>{NoOfSeats} tickets </button>
            <button onClick={handleClose} className={styles.closeBtn}>
              ✖
            </button>
          </div>
        </div>
        <div className={styles.secondaryHeader}>
          {isRatedR && (
            <p className={styles.secondaryText}>
              Adult Movie - Children below 18 years are not allowed.
            </p>
          )}
          <div className={styles.timings}>
            {/* 
            <span>07:30 PM DOLBY 7.1</span>
            <span>10:20 PM DOLBY 7.1</span> 
            */}
            {currShowTimes?.map((show, ind) => {
              return (
                <div
                  key={ind}
                  onClick={() => handleShowTime(show.time, show.rows)}
                >
                  <span
                    className={
                      selectedTime === show.time ? styles.applySelect : ""
                    }
                  >
                    {show.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Seating Arrangement */}
      <Seats />
    </div>
  );
}

export default SeatingArrangement;

/* 
rows = [
        {
          section: "Rs. 550 Premium",
          seatsInfo: [
            {
              rowName: "M",
              seatNos: [
                {no: 11, booked: false},
                {no: 10, booked: false},
                {no: 9, booked: false}, 
                ...upto 1
              ]        
            },
            {
              rowName: "L"
              seatNos: [
                {no: 20, booked: false},
                ...upto 1  
              ]            
            },
            {
              rowName: "K"
              seatNos: [
                {no: 20, booked: false},
                {no: 19, booked: false},
                {no: 18, booked: false}, 
                ...upto 1
              ]
            } 
          ]        
        },
       
        {
           section: 'Rs. 350 EXECUTIVE' 
           seatsInfo: [
            {
              rowName: "J",
              seatNos: [
                {no: 20, booked: false},
                {no: 19, booked: false},
                {no: 18, booked: false}, 
                ...upto 1
              ]        
            },
            {
              rowName: "I"
              seatNos: [
                {no: 20, booked: false},
                ...upto 1  
              ]            
            },
            {
              rowName: "H"
              seatNos: [
                {no: 20, booked: false},
                {no: 19, booked: false},
                {no: 18, booked: false}, 
                ...upto 1
              ]
            },
             {
              rowName: "G"
              seatNos: [
                {no: 24, booked: false},
                {no: 23, booked: false},
                {no: 22, booked: false}, 
                ...upto 1
              ]
            },
            ...so on for "F" (24 seats), "E" (24 seats), "D" (20 seats), "C" (20 seats).
          ]     
        },
        {
          section: "Rs. 350 Normal",
          seatsInfo: [
            {
              rowName: "B",
              seatNos: [
                {no: 20, booked: false},
                {no: 19, booked: false},
                {no: 18, booked: false}, 
                ...upto 1
              ]        
            },
            {
              rowName: "A"
              seatNos: [
                {no: 20, booked: false},
                ...upto 1  
              ]            
            },
          ]        
        },

      ]

**********************************************************************************************************************************
**********************************************************************************************************************************
{
  "_id":{"$oid":"66b71c021bbf0cfefadbc248"},
  "location":"Mumbai",
  "theaters":[
      {
       "theaterName":"PVR Lower Parel",
       "showDates":[
          {
           "date":"Aug 13 2024",
           "showTimes":[
              {time: "8:00 AM", rows: [
               {
                 section: "Rs. 550 Premium",
                 seatsInfo: [
                   {
                     rowName: "M",
                     seatNos: Array.from({ length: 11 }, (_, i) => ({
                       category: "Rs. 550 Premium",
                       rowName: "M",
                       no: 11 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                   {
                     rowName: "L",
                     seatNos: Array.from({ length: 20 }, (_, i) => ({
                       category: "Rs. 550 Premium",
                       rowName: "L",
                       no: 20 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                   {
                     rowName: "K",
                     seatNos: Array.from({ length: 20 }, (_, i) => ({
                       category: "Rs. 550 Premium",
                       rowName: "K",
                       no: 20 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                 ],
               },
               {
                 section: "Rs. 350 EXECUTIVE",
                 seatsInfo: [
                   {
                     rowName: "J",
                     seatNos: Array.from({ length: 20 }, (_, i) => ({
                       category: "Rs. 350 EXECUTIVE",
                       rowName: "J",
                       no: 20 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                   {
                     rowName: "I",
                     seatNos: Array.from({ length: 20 }, (_, i) => ({
                       category: "Rs. 350 EXECUTIVE",
                       rowName: "I",
                       no: 20 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                   {
                     rowName: "H",
                     seatNos: Array.from({ length: 20 }, (_, i) => ({
                       category: "Rs. 350 EXECUTIVE",
                       rowName: "H",
                       no: 20 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                   {
                     rowName: "G",
                     seatNos: Array.from({ length: 24 }, (_, i) => ({
                       category: "Rs. 350 EXECUTIVE",
                       rowName: "G",
                       no: 24 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                   {
                     rowName: "F",
                     seatNos: Array.from({ length: 24 }, (_, i) => ({
                       category: "Rs. 350 EXECUTIVE",
                       rowName: "F",
                       no: 24 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                   {
                     rowName: "E",
                     seatNos: Array.from({ length: 24 }, (_, i) => ({
                       category: "Rs. 350 EXECUTIVE",
                       rowName: "E",
                       no: 24 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                   {
                     rowName: "D",
                     seatNos: Array.from({ length: 20 }, (_, i) => ({
                       category: "Rs. 350 EXECUTIVE",
                       rowName: "D",
                       no: 20 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                   {
                     rowName: "C",
                     seatNos: Array.from({ length: 20 }, (_, i) => ({
                       category: "Rs. 350 EXECUTIVE",
                       rowName: "C",
                       no: 20 - i,
                       booked: false,
                       soldOut: true,
                     })),
                   },
                 ],
               },
               {
                 section: "Rs. 350 Normal",
                 seatsInfo: [
                   {
                     rowName: "B",
                     seatNos: Array.from({ length: 20 }, (_, i) => ({
                       category: "Rs. 350 Normal",
                       rowName: "B",
                       no: 20 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                   {
                     rowName: "A",
                     seatNos: Array.from({ length: 20 }, (_, i) => ({
                       category: "Rs. 350 Normal",
                       rowName: "A",
                       no: 20 - i,
                       booked: false,
                       soldOut: false,
                     })),
                   },
                 ],
               },
             ];
            },
              {time: "09:30 AM", rows:...}
            ]
          },
          {
            "date":"Aug 14 2024",
            "showTimes":["8:00 AM","09:30 AM","1:30 PM"]
          },
          {
            "date":"Aug 15 2024",
            "showTimes":["9:30 AM","12:30 PM","4:00 PM","7:30 PM"]},
          { "date":"Aug 16 2024",
            "showTimes":["10:00 AM","1:00 PM","5:00 PM","8:00 PM","11:00 PM"]
          },
        ]
      },       
      {
       "theaterName":"Cinepolis Andheri",
       "showDates":[
          {"date":"Aug 13 2024","showTimes":["9:00 AM","12:00 PM","3:00 PM"]},
          {"date":"Aug 14 2024","showTimes":["10:00 AM","1:00 PM","4:00 PM"]},
          {"date":"Aug 15 2024","showTimes":["11:00 AM","2:00 PM","5:00 PM","8:00 PM"]},
          {"date":"Aug 16 2024","showTimes":["12:00 PM","3:00 PM","6:00 PM","9:00 PM"]},
        ]
      },      
      {
       "theaterName":"PVR Cinemas - Phoenix Marketcity",
       "showDates":[
          {"date":"Aug 13 2024","showTimes":["10:00 AM","1:00 PM","4:00 PM"]},
          {"date":"Aug 14 2024","showTimes":["11:00 AM","2:00 PM","5:00 PM"]},
          {"date":"Aug 15 2024","showTimes":["12:00 PM","3:00 PM","6:00 PM","9:00 PM"]},
          {"date":"Aug 16 2024","showTimes":["1:00 PM","4:00 PM","7:00 PM","10:00 PM"]},
        ] 
       },
     ] 
 }

*/
