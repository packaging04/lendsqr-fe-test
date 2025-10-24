"use client";
import Image from "next/image";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.svg";
import { useEffect, useRef, useState } from "react";

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    if (onMenuClick) onMenuClick();
  };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Image src={logo} alt="Lendsqr logo" width={140} height={40} />
        </div>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Search for anything" />
          <button aria-label="Search" className={styles.searchButton}>
            <Image
              src="/icons/Vector.png"
              alt="Search Icon"
              width={14}
              height={14}
            />
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <button
          className={styles.menuBtn}
          onClick={toggleMenu}
          aria-label="Toggle dropdown"
        >
          ☰
        </button>

        <a href="#" className={styles.docs}>
          Docs
        </a>

        <div className={styles.notificationProfile}>
          <button className={styles.notificationBtn} aria-label="Notifications">
            <Image
              src="/icons/bell.png"
              alt="Notification Logo"
              width={21}
              height={24}
            />
          </button>
          <div className={styles.profile}>
            <Image
              src="/icons/avatar.png"
              alt="Avatar"
              width={48}
              height={48}
            />
            <span className={styles.username}>Adedeji</span>
            <Image
              src="/icons/dropdown.png"
              alt="Dropdown Icon"
              className={styles.dropdownIcon}
              width={20}
              height={20}
            />
          </div>
        </div>

        {/* ✅ Dropdown Menu */}
        {menuOpen && (
          <div className={styles.dropdownMenu} ref={menuRef}>
            <a href="#" className={styles.docsMobile}>
              Docs
            </a>

            <button
              className={styles.notificationBtnMobile}
              aria-label="Notifications"
            >
              <Image
                src="/icons/bell.png"
                alt="Notification Logo"
                width={21}
                height={24}
              />
              <span>Notifications</span>
            </button>

            <div className={styles.profileMobile}>
              <Image
                src="/icons/avatar.png"
                alt="Avatar"
                width={40}
                height={40}
              />
              <span className={styles.username}>Adedeji</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
