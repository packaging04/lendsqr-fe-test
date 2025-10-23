"use client";
import styles from "./login.module.scss";
import logo from '@/assets/images/logo.svg';
import Hero from '@/assets/images/hero.png';
import Image from 'next/image';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
   const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Optional: Perform validation or API authentication here
    // e.g., check credentials, call API, etc.

    // For now, just redirect to dashboard
    router.push("/dashboard");
  };

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

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input type="email" id="email" placeholder="Email" 
                      onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
                <div className={styles.passwordField}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      aria-label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                    type="button"
                    className={styles.showBtn}
                    onClick={togglePasswordVisibility}
                    aria-pressed={showPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                    {showPassword ? "HIDE" : "SHOW"}
                    </button>
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
