import styles from "./StatCard.module.scss";

export default function StatCard({ title, value, icon }: { title: string; value: string | number; icon?: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.value}>{value}</div>
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
}
