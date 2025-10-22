"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import styles from "./dashboard.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.dashboard}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className={styles.main}>
        <Header onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}