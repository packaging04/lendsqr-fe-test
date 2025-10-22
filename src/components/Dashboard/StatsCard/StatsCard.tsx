"use client";
import styles from "./StatsCard.module.scss";
import Image from "next/image";

type StatsCardProps = {
  icon: string;
  title: string;
  value: string | number;
  color?: string; // optional for custom bg color
};

export default function StatsCard({ icon, title, value, color }: StatsCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper} style={{ backgroundColor: color }}>
        <Image src={icon} alt={title} width={20} height={20} />
      </div>
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
