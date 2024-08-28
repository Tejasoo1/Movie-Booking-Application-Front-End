import { useSelector } from "react-redux";
import styles from "./BookingHistory.module.css";
import Navbar from "./Navbar";
import Axios from "axios";
import { useEffect, useState } from "react";

/* 
1] Replace 'http://localhost:5000' with  'https://movies-booking-application-back-end.onrender.com'

*/

function BookingHistory() {
  const { signInData } = useSelector((state) => state.userInfo);
  const [fetchedBookingHistory, setFetchedBookingHistory] = useState([]);

  useEffect(() => {
    Axios.post(
      "https://movies-booking-application-back-end.onrender.com/get/bookinghistory",
      {
        ...signInData,
      },
    ).then((res) => {
      const BookingHistoryArr = res.data.bookingHistoryArray;
      setFetchedBookingHistory(BookingHistoryArr);
    });
    // Axios.post("http://localhost:5000/get/bookinghistory", {
    //   ...signInData,
    // }).then((res) => {
    //   console.log(res.data);
    //   const BookingHistoryArr = res.data.bookingHistoryArray;
    //   setFetchedBookingHistory(BookingHistoryArr);
    // });
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.purchaseHistory}>
        {fetchedBookingHistory.map((booking, index) => (
          <div key={index} className={styles.ticketCard}>
            <div className={styles.dateSection}>
              <span>
                {booking.day}, {booking.date}
              </span>
            </div>
            <div className={styles.ticketDetails}>
              <img
                src={booking.movieDetails.image_url}
                alt={booking.movieDetails.movie_name}
                className={styles.moviePoster}
              />
              <div className={styles.details}>
                <h2>{booking.movieDetails.movie_name}</h2>
                <p>{booking.time}</p>
                <p>
                  {booking.theaterName}, {booking.currLocation}
                </p>
                <p>{booking.seatInfo}</p>
              </div>
              <div className={styles.ticketsSection}>
                <span>{booking.totalTickets} Tickets</span>
                {/* Add a conditional for cancellation if needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BookingHistory;
