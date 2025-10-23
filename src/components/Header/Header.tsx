"use client";
import Image from "next/image";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.svg";

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
        <Image src={logo} alt="Lendsqr logo" width={140} height={40} />
      </div>
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
       
       <div className={styles.notificationProfile}>
          <button className={styles.notificationBtn} aria-label="Notifications">
            <Image src="/icons/bell.png" alt="Notification Logo" width={21} height={24} />
          </button>
          <div className={styles.profile}>
            <Image src="/icons/avatar.png" alt="Avatar" width={48} height={48} />
            <span className={styles.username}>Adedeji</span>
            <Image src="/icons/dropdown.png" alt="Drop down Logo" className={styles.dropdownIcon} width={20} height={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
