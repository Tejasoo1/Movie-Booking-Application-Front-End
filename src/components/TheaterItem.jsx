import React, { useState } from "react";
import styles from "./TheaterItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTheater, updateTime } from "./locationsAndTheatersSlice";

//Helper function
/*
function generateCurrentDate() {
  const date = new Date();

  // Extracting day of the week (e.g., "Fri")
  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });

  // Extracting month (e.g., "Aug")
  const month = date.toLocaleString('en-US', { month: 'short' });

  // Extracting day of the month (e.g., "09")
  const dayOfMonth = date.toLocaleString('en-US', { day: '2-digit' });

  console.log(month + ' ' + dayOfMonth + ' ' + '2024');

  return month + ' ' + dayOfMonth + ' ' + '2024';
}
*/

//functional component.
function TheaterItem({ theater, onSetModal }) {
  console.log("TheaterItem component");
  console.log(theater);

  //State variables
  // const [selectedDate, setSelectedDate] = useState(() => generateCurrentDate());

  const { currDates: dates } = useSelector((state) => state.locationAndTheater);
  const dispatch = useDispatch();
  //Derived states
  const currActiveDateObj = dates?.find((curr) => curr.active);
  console.log({ currActiveDateObj });

  const currActiveDate =
    currActiveDateObj.month + " " + currActiveDateObj.date + " " + "2024";

  console.log(currActiveDate);

  //Derived states
  const currShowTimes = theater.showDates?.find(
    (curr) => curr.date === currActiveDate,
  )?.showTimes;

  console.log({ currShowTimes });

  //Event Handler functions.
  function displaySeatModal(show) {
    console.log("displayModal func.");
    console.log({ show });

    dispatch(updateTheater(theater));
    dispatch(updateTime(show));
    onSetModal(true);
  }

  return (
    <div className={styles.theaterContainer}>
      <div className={styles.theaterItem}>
        <div className={styles.theaterHeader}>
          <h3>{theater.theaterName}</h3>
          <div className={styles.options}>
            <span className={styles.ticket}>M-Ticket</span>
            <span className={styles.beverage}>Food & Beverage</span>
          </div>
        </div>
        <div className={styles.showTimings}>
          <div className={styles.timings}>
            {/* 
            <span>07:30 PM DOLBY 7.1</span>
            <span>10:20 PM DOLBY 7.1</span> 
            */}
            {currShowTimes?.map((show, ind) => {
              return (
                <div onClick={() => displaySeatModal(show?.time)} key={ind}>
                  <span>{show?.time}</span>
                  {/* 
                  <div className={styles.priceDropdown}>
                    <span>Rs. 350.00 NORMAL Available</span>
                    <span>Rs. 370.00 EXECUTIVE Available</span>
                    <span>Rs. 400.00 PREMIUM Available</span>
                    <span>Rs. 630.00 VIP Available</span>
                  </div> 
                  */}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.cancellation}>
          <span>Non-cancellable</span>
        </div>
      </div>
    </div>
  );
}

export default TheaterItem;

/* 
      <div className={styles.theaterItem}>
         <div className={styles.theaterHeader}>
           <h3>INOX Megaplex Phoenix Mall of the Millennium</h3>
           <div className={styles.options}>
             <span>M-Ticket</span>
             <span>Food & Beverage</span>
           </div>
         </div>
         <div className={styles.showTimings}>
           <div className={styles.timings}>
             <span>08:00 PM IMAX</span>
             <span>11:00 PM IMAX</span>
           </div>
         </div>
         <div className={styles.cancellation}>
           <span>Cancellation Available</span>
         </div>
      </div>
*/
