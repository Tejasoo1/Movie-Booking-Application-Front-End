import { useState } from 'react';
import styles from './SeatsModal.module.css';
import { useDispatch } from 'react-redux';
import { updateSeatNo } from './locationsAndTheatersSlice';
import { useNavigate } from 'react-router-dom';

function SeatsModal({ onSetModal }) {
  const [selectedSeats, setSelectedSeats] = useState(2); // Default selected seat count.

  console.log('SeatsModal');
  console.log({ selectedSeats });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSeatSelection = (seat) => {
    dispatch(updateSeatNo(seat));
    setSelectedSeats(seat);
  };

  function handleSelectBtn() {
    console.log('handleSelectBtn');
    navigate('/seatingArrangement');
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>How Many Seats?</h2>
          <button
            className={styles.closeButton}
            onClick={() => onSetModal(false)}
          >
            &times;
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.imageContainer}>
            <img
              src="https://cdn.dribbble.com/users/1249515/screenshots/7925267/media/9b58dd8d07eaa78fbea4d980364de5ed.gif" // Replace with the actual path
              alt="Scooter"
              className={styles.scooterImage}
            />
          </div>
          <div className={styles.seatNumbers}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((seat) => (
              <div
                key={seat}
                className={`${styles.seatNumber} ${
                  selectedSeats === seat ? styles.selected : ''
                }`}
                onClick={() => handleSeatSelection(seat)}
              >
                {seat}
              </div>
            ))}
          </div>
          <div className={styles.seatTypes}>
            <div className={styles.seatType}>
              <span>Normal</span>
              <span>Rs. 350</span>
              <span className={styles.available}>Available</span>
            </div>
            <div className={styles.seatType}>
              <span>Executive</span>
              <span>Rs. 350</span>
              <span className={styles.available} style={{ color: 'orange' }}>
                Filling-Fast
              </span>
            </div>
            <div className={styles.seatType}>
              <span>Premium</span>
              <span>Rs. 350</span>
              <span className={styles.available} style={{ color: 'red' }}>
                Almost Full
              </span>
            </div>
            <div className={styles.seatType}>
              <span>VIP</span>
              <span>Rs. 650</span>
              <span className={styles.available}>Available</span>
            </div>
          </div>
          <button
            className={styles.selectSeatsButton}
            onClick={handleSelectBtn}
          >
            Select Seats
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatsModal;
