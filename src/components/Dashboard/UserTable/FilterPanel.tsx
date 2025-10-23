"use client";
import styles from "./FilterPanel.module.scss";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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
  organizations: string[];
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

export default function FilterPanel({
  onClose,
  onApply,
  onReset,
  organizations,
  anchorRef,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<Filters>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phone: "",
    status: "",
  });

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleSelectOrg = (org: string) => {
    setFilters((prev) => ({ ...prev, organization: org }));
    setOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  // Position below the button
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  }, [anchorRef]);

  return (
    <div
      ref={panelRef}
      className={styles.panelPopover}
      style={{ top: position.top, left: position.left }}
    >
      <h4 className={styles.title}>Filter Users</h4>

      {/* Organization */}
      <div className={styles.formGroup}>
        <label className={styles.detail}>Organization</label>
        <div className={styles.selectWrapper}>
          <div className={styles.customSelect}>
            <button
              type="button"
              className={styles.selectButton}
              onClick={() => setOpen((prev) => !prev)}
            >
              {filters.organization || "Select organization"}
              <ChevronDown
                size={16}
                className={`${styles.icon} ${open ? styles.rotate : ""}`}
              />
            </button>

            {open && (
              <ul className={styles.dropdownList}>
                {[...new Set(organizations)]
                  .filter(Boolean)
                  .sort((a, b) => a.localeCompare(b))
                  .map((org) => (
                    <li key={org} onClick={() => handleSelectOrg(org)}>
                      {org}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Username */}
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

      {/* Email */}
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

      {/* Date */}
      <div className={styles.formGroup}>
        <label className={styles.detail}>Date</label>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
        />
      </div>

      {/* Phone */}
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

      {/* Status */}
      <div className={styles.formGroup}>
        <label className={styles.detail}>Status</label>
        <div className={styles.selectWrapper}>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
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
  );
}
