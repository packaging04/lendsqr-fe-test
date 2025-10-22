"use client";
import React from "react";
import styles from "./UsersTable.module.scss";
import Badge from "@/components/Badge/Badge";

type User = {
  id: string;
  org: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
};

export default function UsersTable({ rows }: { rows: User[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table} role="table">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Date joined</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.org}</td>
              <td>{r.username}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td>{r.dateJoined}</td>
              <td><Badge status={r.status} /></td>
              <td><button aria-label="Open actions">⋮</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
