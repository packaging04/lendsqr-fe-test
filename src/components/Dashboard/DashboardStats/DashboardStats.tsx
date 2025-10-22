"use client";
import StatsCard from "../StatsCard/StatsCard";
import styles from "./DashboardStats.module.scss";

const stats = [
  {
    title: "Users",
    value: "2,453",
    icon: "/icons/np_users_01.png",
    color: "#DF18FF1A",
  },
  {
    title: "Active Users",
    value: "2,453",
    icon: "/icons/np_users_02.png",
    color: "#5718FF1A",
  },
  {
    title: "Users with Loans",
    value: "12,453",
    icon: "/icons/np_loan_03.png",
    color: "#F55F441A",
  },
  {
    title: "Users with Savings",
    value: "102,453",
    icon: "/icons/np_money_04.png",
    color: "#FF33661A",
  },
];

export default function DashboardStats() {
  return (
    <section className={styles.dashboardStats}>
      <h2 className={styles.title}>Users</h2>
      <div className={styles.cardsGrid}>
        {stats.map((s, i) => (
          <StatsCard key={i} {...s} />
        ))}
      </div>
    </section>
  );
}
