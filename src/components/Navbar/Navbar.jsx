import Link from "next/link";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
const Navbar = () => {
  const role = useSelector((state) => state.role);
  const btn = role ? (
    <Link href="/">
      <button>Log Out</button>
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
