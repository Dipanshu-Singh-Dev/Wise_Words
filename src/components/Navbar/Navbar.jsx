import Link from "next/link";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  const role = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch({ type: "", role: "", user: "" });
    router.replace(router.asPath);
  };
  const btn = role ? (
    <Link href="/">
      <button onClick={logOut}>Log Out</button>
    </Link>
  ) : (
    <Link href="login">
      <button>Log In</button>
    </Link>
  );
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">Wise Words</Link>
      </div>
      <div className={styles.loginButtons}>
        {btn}
        <button className={styles.signUpBtn}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
