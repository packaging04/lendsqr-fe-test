"use client";
import Image from "next/image";
import styles from "./Header.module.scss";

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Search for anything" />
          <button aria-label="Search" className={styles.searchButton}>
            <Image src="/icons/Vector.png" alt="Lendsqr logo" width={14} height={14} />
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <a href="#" className={styles.docs}>
          Docs
        </a>
        <div className={styles.profile}>
          <img
            src="/avatar.jpg"
            alt="User avatar"
            className={styles.avatar}
            width={32}
            height={32}
          />
          <span className={styles.username}>Adedeji</span>
        </div>
      </div>
    </header>
  );
}
