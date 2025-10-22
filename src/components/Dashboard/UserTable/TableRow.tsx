"use client";
import React, { useRef, useEffect } from "react";
import styles from "./TableRow.module.scss";
import ActionMenu from "./ActionMenu";
import clsx from "clsx";
import { User } from "./UserTable";
import Image from "next/image";

interface TableRowProps {
  user: User;
  isMenuOpen: boolean;
  onOpenMenu: (id: string, ref: HTMLElement | null) => void;
  onCloseMenu: () => void;
}


export default function TableRow({ user, isMenuOpen, onOpenMenu, onCloseMenu }: TableRowProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // click outside to close
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) {
        onCloseMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, onCloseMenu]);

  return (
    <tr className={styles.row}>
      <td>{user.organization}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.dateJoined}</td>
      <td>
        <span
          className={clsx(styles.status, styles[user.status.toLowerCase()])}
        >
          {user.status}
        </span>
      </td>
      <td className={styles.actionsCell}>
        <div className={styles.moreWrapper}>
         <button
            ref={btnRef}
            onClick={(e) => {
                e.stopPropagation();
                const rect = btnRef.current?.getBoundingClientRect() || null;
                onOpenMenu(user.id, rect ? btnRef.current : null);
            }}
            style={{
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                cursor: "pointer",
                outline: "none",
            }}
            >
            <Image src="/icons/more.png" alt="More Icon" width={16} height={16} />
            </button>


          {isMenuOpen && (
            <div ref={menuRef}>
              <ActionMenu
                onClose={onCloseMenu}
                onView={() => alert(`Viewing ${user.username}`)}
                onBlacklist={() => alert(`Blacklisted ${user.username}`)}
                onActivate={() => alert(`Activated ${user.username}`)}
              />
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
