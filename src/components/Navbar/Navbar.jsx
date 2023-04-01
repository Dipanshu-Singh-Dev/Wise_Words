import Link from "next/link";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">Wise Words</Link>
      </div>
      <div className={styles.loginButtons}>
        <button className={styles.loginBtn}>Log In</button>
        <button className={styles.signUpBtn}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
