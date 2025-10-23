"use client";
import Link from "next/link";
import styles from "./ActionMenu.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@/hooks/useUsers";

interface ActionMenuProps {
  onClose: () => void;
  user: User;
  onBlacklist: () => void;
  onActivate: () => void;
}

export default function ActionMenu({
  onClose,
  user,
  onBlacklist,
  onActivate,
}: ActionMenuProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedUser", JSON.stringify(user));
    }

    onClose(); // close the menu
    router.push(`/dashboard/users/${user.id}`); // navigate to details page
  };

  return (
    <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
      <button className={styles.item} onClick={handleViewDetails}>
        <Image
          src="/icons/eye.png"
          alt="More Details"
          width={16}
          height={16}
        />
        <span className={styles.detail}>View Details</span>
      </button>

      <button
        className={styles.item}
        onClick={() => {
          onBlacklist();
          onClose();
        }}
      >
        <Image
          src="/icons/np_users_05.png"
          alt="Blacklist User"
          width={14}
          height={14}
        />
        <span className={styles.detail}>Blacklist User</span>
      </button>

      <button
        className={styles.item}
        onClick={() => {
          onActivate();
          onClose();
        }}
      >
        <Image
          src="/icons/np_users_06.png"
          alt="Activate User"
          width={14}
          height={14}
        />
        <span className={styles.detail}>Activate User</span>
      </button>
    </div>
  );
}
