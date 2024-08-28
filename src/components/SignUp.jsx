import { useState } from "react";
import Navbar from "./Navbar";
import styles from "./SignUp.module.css";
import Axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignUp() {
  const [resultMessage, setResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log("SignUp component");

  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();

    //Logic for extracting the entered data into form fields
    const formData = new FormData(e.currentTarget);

    //data variable, then will contain an object having the collected input field data.
    const data = Object.fromEntries(formData); //here

    //Guard Clause
    // if (data.password !== data.confirmpassword) {
    //   alert('password is not matching with confirmpassword');
    //   return;
    // }

    console.log(e.target);
    console.log(data);

    //Logic to send the form details to Express Application(Server:- An API endpoint)
    /*
     1] After connecting to that endpoint, to that endpoint you need to pass 1 detail(an object)
        i.e. only 3 details from the data object.

     2] Whenever you pass the 'details' it should be in the form of a key-value pair.
     3] So, whenever you are giving the 'details' for creating purpose to a 'post' method, always
        send that data in 'object' format.

        {
         ...data,
        } ---
            |
            |---> Now this 'entire' object will be collected by 'one' parameter, i.e. req parameter
                  on the server side.
    */

    Axios.post(
      "https://movies-booking-application-back-end.onrender.com/signup",
      {
        ...data,
      },
    )
      .then((message) => {
        console.log({ message: message.data });
        setErrorMessage("");
        // setResultMessage(message.data);
        toast.success("Signed Up Sucessfully !!");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage(err.message);
        setResultMessage("");
      });

    // Axios.post("http://localhost:5000/signup", {
    //   ...data,
    // })
    //   .then((message) => {
    //     console.log({ message: message.data });
    //     setErrorMessage("");

    //     toast.success("Signed Up Sucessfully !!");
    //     navigate("/login");
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //     setErrorMessage(err.message);
    //     setResultMessage("");
    //   });

    e.target.reset();
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.header}>
        <h1>Signup for Booking Movies</h1>
        <p>Book your favorite movies in just a few clicks!</p>
      </div>
      <form onSubmit={handleFormSubmit} className={styles.formContainer}>
        <label className={styles.formLabel}>Enter Username:</label>
        <input
          className={styles.formInput}
          type="text"
          name="username"
          required
        />

        <label className={styles.formLabel}>Enter Email:</label>
        <input
          className={styles.formInput}
          type="email"
          name="email"
          required
        />

        <label className={styles.formLabel}>Enter Password:</label>
        <input
          className={styles.formInput}
          type="password"
          name="password"
          required
        />

        <label className={styles.formLabel}>Confirm Password:</label>
        <input
          className={styles.formInput}
          type="password"
          name="confirmpassword"
          required
        />

        {!resultMessage && !errorMessage && (
          <button className={styles.formButton}>Signup</button>
        )}

        {errorMessage && !resultMessage && (
          <div className={styles.errorContainer}>
            <span className={styles.errorMessage}>
              {"Registration Failed !!!"}
            </span>
            <button className={styles.errorButton}>Try Signing Up Again</button>
          </div>
        )}

        {!errorMessage && resultMessage && (
          <p className={styles.resultMessage}>{resultMessage}</p>
        )}
      </form>
      <div className={styles.signInContainer}>
        <NavLink to="/signin" className={styles.signInBtn}>
          Already have an Account !! Sign In Here
        </NavLink>
      </div>
    </>
  );
}

export default SignUp;
