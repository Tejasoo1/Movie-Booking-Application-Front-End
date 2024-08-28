import { useState } from "react";
import Navbar from "./Navbar";
import styles from "./SignIn.module.css";

import Axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateAuthentication, updateSignInDetails } from "./userSlice";
import { locationDetails } from "../data/ServerData";

console.log({ locationDetails });

function SignIn() {
  // const [signInResult, setSignInResult] = useState('');
  const [signInError, setSignInError] = useState("");

  console.log("SignIn component");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const signInDetails = {
      email: data.get("email"),
      password: data.get("password"),
    };

    console.log({ signInDetails });
    // onSetLogin(signInDetails);

    // Logic to send email & password to the express application:-
    Axios.post(
      "https://movies-booking-application-back-end.onrender.com/signin",
      { ...signInDetails },
    )
      .then((message) => {
        console.log(message.data);
        setSignInError("");
        // setSignInResult(message.data);
        dispatch(updateSignInDetails(signInDetails));
        dispatch(updateAuthentication(true));
        toast.success(message.data);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err.response);
        // setSignInResult('');
        setSignInError(err.response.data.error);
      });

    // Axios.post("http://localhost:5000/signin", { ...signInDetails })
    //   .then((message) => {
    //     console.log(message.data);
    //     setSignInError("");
    //     dispatch(updateSignInDetails(signInDetails));
    //     dispatch(updateAuthentication(true));
    //     toast.success(message.data);
    //     navigate("/movies");
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //     setSignInError(err.response.data.error);
    //   });

    event.target.reset();
  };

  function handleSignUp() {
    navigate("/signup");
  }

  return (
    <>
      {/* <Navbar /> */}
      <header className={styles.heading}>
        Movie Booking Application
        <img
          className={styles.logo}
          src="https://img.freepik.com/premium-vector/movie-time-10-eps-icon-vector-illustration-symbol_596496-186.jpg"
          alt="application logo"
        />
      </header>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign In</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              required
            />
          </div>

          {!signInError && (
            <button type="submit" className={styles.button}>
              Sign In
            </button>
          )}

          {signInError && (
            <div className={styles.errorContainer}>
              <span className={styles.errorMessage}>{signInError}</span>
              <button type="submit" className={styles.errorButton}>
                Sign In Again !
              </button>
            </div>
          )}
        </form>
        <button onClick={handleSignUp} className={styles.signUpBtn}>
          Not Signed In !! Sign Up Here
        </button>
      </div>
    </>
  );
}

export default SignIn;
