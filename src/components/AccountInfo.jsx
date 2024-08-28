import { useDispatch, useSelector } from "react-redux";
import { updateAuthentication, updateSignInDetails } from "./userSlice";
import { useNavigate } from "react-router-dom";

import styles from "./AccountInfo.module.css";

function AccountInfo({ onSetMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.userInfo);
  console.log(isAuthenticated);

  function handleSigningOut() {
    //Guard Clause
    if (!isAuthenticated) {
      console.log("Already signedout");
      return;
    }

    dispatch(updateSignInDetails({}));
    dispatch(updateAuthentication(false));
    localStorage.removeItem("signInData");
    onSetMenu(false);
    navigate("/signin");
  }

  return (
    <div className={styles.accountContainer}>
      <button className={styles.signoutBtn} onClick={handleSigningOut}>
        Sign Out
      </button>
    </div>
  );
}

export default AccountInfo;
