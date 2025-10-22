"use client";
import styles from "./FilterPanel.module.scss";
import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";

export type Filters = {
  organization: string;
  username: string;
  email: string;
  date: string;
  phone: string;
  status: string;
};

interface FilterPanelProps {
  onClose: () => void;
  onApply: (filters: Filters) => void;
  onReset: () => void;
}

export default function FilterPanel({ onClose, onApply, onReset }: FilterPanelProps) {
  const [filters, setFilters] = useState<Filters>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phone: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <h4 className={styles.title}>Filter Users</h4>

        <div className={styles.formGroup}>
          <label className={styles.detail}>Organization</label>
          <div className={styles.selectWrapper}>
            <select name="organization" value={filters.organization} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Lendsqr">Lendsqr</option>
              <option value="Lendstar">Lendstar</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.detail}>Username</label>
          <input
            type="text"
            name="username"
            value={filters.username}
            onChange={handleChange}
            placeholder="User"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.detail}>Email</label>
          <input
            type="email"
            name="email"
            value={filters.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.detail}>Date</label>
          <div className={styles.dateWrapper}>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
            />
            {/* <Calendar size={16} className={styles.icon} /> */}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.detail}>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={filters.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.detail}>Status</label>
          <div className={styles.selectWrapper}>
            <select name="status" value={filters.status} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Blacklisted">Blacklisted</option>
            </select>
            {/* <ChevronDown size={16} className={styles.icon} /> */}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            onClick={() => {
              setFilters({
                organization: "",
                username: "",
                email: "",
                date: "",
                phone: "",
                status: "",
              });
              onReset();
            }}
            className={styles.resetBtn}
          >
            Reset
          </button>
          <button onClick={handleApply} className={styles.filterBtn}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
