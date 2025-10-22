"use client";
import { Eye, UserMinus, UserCheck } from "lucide-react";
import styles from "./ActionMenu.module.scss";
import Image from "next/image";

interface ActionMenuProps {
  onClose: () => void;
  onView: () => void;
  onBlacklist: () => void;
  onActivate: () => void;
}

export default function ActionMenu({ onClose, onView, onBlacklist, onActivate }: ActionMenuProps) {
  return (
    <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
      <button className={styles.item} onClick={() => { onView(); onClose(); }}>
        <Image src="/icons/eye.png" alt="More Details" width={16} height={16} /><span className={styles.detail}>View Details</span>
      </button>
      <button className={styles.item} onClick={() => { onBlacklist(); onClose(); }}>
        <Image src="/icons/np_users_05.png" alt="Blacklist User" width={14} height={14} /><span className={styles.detail}>Blacklist User</span>
      </button>
      <button className={styles.item} onClick={() => { onActivate(); onClose(); }}>
        <Image src="/icons/np_users_06.png" alt="Activate User" width={14} height={14} /><span className={styles.detail}>Activate User</span>
      </button>
    </div>
  );
}
