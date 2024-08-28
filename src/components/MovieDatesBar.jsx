import { useDispatch, useSelector } from "react-redux";
import styles from "./MovieDatesBar.module.css";
import {
  updatesCurrDates,
  updateSelectedDate,
} from "./locationsAndTheatersSlice";
import { useEffect } from "react";

function currentDateFormat(currDateObjs) {
  //Derived State.
  const currActiveDateObj = currDateObjs?.find((curr) => curr.active);
  console.log({ currActiveDateObj });

  //This date format needed to find currShowTimes
  const currDate =
    currActiveDateObj.month + " " + currActiveDateObj.date + " " + "2024";

  return currDate;
}

function MovieDatesBar() {
  console.log("MovieDatesBar");

  const { currDates: dates } = useSelector((state) => state.locationAndTheater);

  console.log({ dates });

  const dispatch = useDispatch();

  function handleDate(currDate) {
    console.log(currDate);
    const updatedDates = dates.map((curr) =>
      curr.date === currDate
        ? { ...curr, active: true }
        : { ...curr, active: false },
    );

    console.log({ updatedDates });
    // onChangeDates(updatedDates);

    const selectedDate = currentDateFormat(updatedDates);
    console.log({ selectedDate });

    dispatch(updateSelectedDate(selectedDate));
    dispatch(updatesCurrDates(updatedDates));
  }

  //For setting up the initial current date, as selectedDate.
  useEffect(() => {
    const selectedDate = currentDateFormat(dates);
    dispatch(updateSelectedDate(selectedDate));
  }, []);

  return (
    <div className={styles.dateBar}>
      <button className={styles.arrowButton}>&lt;</button>
      {dates.map((date, index) => (
        <div
          key={index}
          onClick={() => handleDate(date.date)}
          className={`${styles.dateItem} ${date.active ? styles.active : ""}`}
        >
          <span className={styles.day}>{date.day}</span>
          <span className={styles.date}>{date.date}</span>
          <span className={styles.month}>{date.month}</span>
        </div>
      ))}
      <button className={styles.arrowButton}>&gt;</button>
      {/* 
      <div className={styles.filters}>
        <span className={styles.filterText}>Hindi - 2D</span>
        <div className={styles.filterDropdown}>Filter Price Range &#x25BC;</div>
        <div className={styles.filterDropdown}>
          Filter Show Timings &#x25BC;
        </div>
        <span className={styles.searchIcon}>&#128269;</span>
      </div> 
      */}
    </div>
  );
}

export default MovieDatesBar;
