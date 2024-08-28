import Axios from "axios";
import { useEffect, useState } from "react";
import TheaterItem from "./TheaterItem";
import MovieDatesBar from "./MovieDatesBar";
import SeatsModal from "./SeatsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrLocation,
  updateLocations,
  updatesCurrDates,
} from "./locationsAndTheatersSlice";

/*
^ date.getDate():

1] This method retrieves the day of the month from a Date object.

2] For example, if date is Fri Aug 09 2024 17:20:50 GMT+0530 (India Standard Time), then date.getDate() 
                 would return 9, which is the 9th day of the month.

^ date.setDate():

1] This method sets the day of the month for the Date object.
2] When you pass the value 'date.getDate() + i' to 'setDate()', it updates the Date object to the new day 
   of the month.

   For example:
   If the original date is 'Aug 09 2024' and i = 1, after calling 'date.setDate(date.getDate() + i)', the 
   Date object will be updated to Aug 10 2024.

*/

function LocationAndTheater() {
  // const [locationsAndTheaters, setLocationAndTheaters] = useState([]);
  // const [currLocation, setCurrLocation] = useState('Mumbai');
  // const [currDates, setCurrDates] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const dispatch = useDispatch();
  console.log("LocationAndTheater component");

  //Accessing the Redux store state.
  const { currDates, currLocation, locationsAndTheaters } = useSelector(
    (state) => state.locationAndTheater,
  );

  console.log({ currLocation });

  //Derived State
  const currTheaters = locationsAndTheaters.find(
    (loc) => loc.location === currLocation,
  )?.theaters;

  console.log({ currTheaters });

  //Effects
  useEffect(() => {
    console.log("useEffect-2 LocationAndTheater");
    //Derived State (Generating Dates)
    const DatesInfo = Array.from({ length: 4 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i); // Increment the date by i days

      // Extracting day of the week (e.g., "Fri")
      const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });

      // Extracting month (e.g., "Aug")
      const month = date.toLocaleString("en-US", { month: "short" });

      // Extracting day of the month (e.g., "09")
      const dayOfMonth = date.toLocaleString("en-US", { day: "2-digit" });

      // return date;

      if (i === 0) {
        return {
          date: dayOfMonth,
          month,
          day: dayOfWeek,
          active: true,
        };
      }

      return {
        date: dayOfMonth,
        month,
        day: dayOfWeek,
        active: false,
      };
    });

    // console.log({ DatesInfo });

    // setCurrDates(DatesInfo);
    dispatch(updatesCurrDates(DatesInfo));
  }, []);

  console.log({ currDates });

  useEffect(() => {
    console.log("useEffect-1 LocationAndTheater");
    Axios.get(
      "https://movies-booking-application-back-end.onrender.com/locations",
    )
      .then((output) => {
        console.log(output);
        // setLocationAndTheaters(output.data.info);
        dispatch(updateLocations(output.data.info));
      })
      .catch((err) => {
        console.log(err.message);
      });

    // Axios.get("http://localhost:5000/locations")
    //   .then((output) => {
    //     console.log(output);
    //     dispatch(updateLocations(output.data.info));
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }, []);

  function handleSelect(val) {
    // setCurrLocation(val);
    dispatch(updateCurrLocation(val));
  }

  return (
    <>
      {locationsAndTheaters.length > 0 ? (
        <div className="absolute right-4 top-4">
          <select
            onChange={(e) => handleSelect(e.target.value)}
            value={currLocation}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "16px",
              right: "420px",
            }}
            className="rounded bg-gray-200 p-2 text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {locationsAndTheaters.map((loc) => {
              return (
                <option key={loc._id} value={loc.location}>
                  {loc.location}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        "Loading..."
      )}

      {/* Display Calender(Dates) */}
      {currDates.length > 0 ? (
        <MovieDatesBar /> /* dates={currDates} onChangeDates={setCurrDates} */
      ) : (
        <p>Loading...</p>
      )}

      {/* Theater Details */}
      {currTheaters ? (
        <div>
          {currTheaters.map((theater) => (
            <TheaterItem
              key={theater._id}
              onSetModal={setDisplayModal}
              theater={theater}
              // dates={currDates}
            />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Display Modal Window */}
      {displayModal && <SeatsModal onSetModal={setDisplayModal} />}
    </>
  );
}

export default LocationAndTheater;

/*
 [{
    "location": "Mumbai",
    "theaters": [
      {
        "theaterName": "PVR Lower Parel",
        "showDates": [
           {
             date: "Aug 10 2024",
             showTimes: ["8:00 AM", "09:30 AM"] 
           },
           {
             date: "Aug 11 2024",
             showTimes: ["8:00 AM", "09:30 AM", "1:30 PM"] 
           },
           {
             date: "Aug 12 2024",
             showTimes: ["9:30 AM", "12:30 PM", "4:00 PM", "7:30 PM"]
           },
           {
            date: "Aug 13 2024",
            showTimes: ["10:00 AM", "1:00 PM", "5:00 PM", "8:00 PM", "11:00 PM"]
           }
         ]
      },
      And so on....
    ]
  }
  And so on....   
 ]
    Can you give me an array of location objects, with theater names belonging to that location  
    and Can you generate the dates dynamically starting from todays date & then add 3 days 
    to it & i want to store this data in mongoDB collection


*/
