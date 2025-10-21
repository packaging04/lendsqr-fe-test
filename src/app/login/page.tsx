"use client";
import styles from "./login.module.scss";
import logo from '@/assets/images/logo.svg';
import Hero from '@/assets/images/hero.png';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className={styles.login}>
      <section className={styles.leftPane}>
        <Image
          src={logo}
          alt="Lendsqr logo"
          className={styles.logo}
          priority
        />
        <Image
          src={Hero}
          alt="Illustration"
          priority
        />
      </section>

      <section className={styles.rightPane}>
        <div className={styles.formContainer}>
          <h1>
            <span>Welcome!</span>
          </h1>
          <p>Enter details to login.</p>

          <form>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Email" />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordField}>
                <input type="password" id="password" placeholder="Password" />
                <span className={styles.show}>SHOW</span>
              </div>
            </div>

            <a href="#" className={styles.forgot}>
              FORGOT PASSWORD?
            </a>

            <button type="submit" className={styles.loginBtn}>
              LOG IN
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
