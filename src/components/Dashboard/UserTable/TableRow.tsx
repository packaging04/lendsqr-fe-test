"use client";
import React, { useRef, useEffect } from "react";
import styles from "./TableRow.module.scss";
import ActionMenu from "./ActionMenu";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@/hooks/useUsers";

interface TableRowProps {
  user: User;
  isMenuOpen: boolean;
  onOpenMenu: (id: string, ref: HTMLElement | null) => void;
  onCloseMenu: () => void;
}

export default function TableRow({
  user,
  isMenuOpen,
  onOpenMenu,
  onCloseMenu,
}: TableRowProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // handle clicking outside to close menu
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

  const handleRowClick = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedUser", JSON.stringify(user));
    }
    router.push(`/dashboard/users/${user.id}`);
  };

  return (
    <tr
      className={styles.row}
      onClick={handleRowClick} // this makes the row to be clickable
      style={{ cursor: "pointer" }}
    >
      <td>{user.organization}</td>
      <td>{user.username}</td>
      <td title={user.email} className={styles.truncate}>
        {user.email}
      </td>
      <td>{user.phone}</td>
      <td>{user.dateJoined}</td>
      <td>
        <span
          className={clsx(styles.status, styles[user.status.toLowerCase()])}
        >
          {user.status}
        </span>
      </td>
      <td
        className={styles.actionsCell}
        onClick={(e) => e.stopPropagation()} // prevent row click when clicking menu
      >
        <div className={styles.moreWrapper}>
          <button
            ref={btnRef}
            onClick={(e) => {
              e.stopPropagation(); // avoid triggering row click
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
                user={user}
                onClose={onCloseMenu}
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