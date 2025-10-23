"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./FilterPanel.module.scss";
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
  anchor: HTMLElement | null;                   // <-- actual anchor element
  onClose: () => void;
  onApply: (filters: Filters) => void;
  onReset: () => void;
  organizations: string[];
  column?: string | null;
}

export default function FilterPanel({
  anchor,
  onClose,
  onApply,
  onReset,
  organizations,
  column,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<Filters>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phone: "",
    status: "",
  });

  const [openOrgList, setOpenOrgList] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // compute & set position when anchor changes or on scroll/resize
  useEffect(() => {
  const update = () => {
    if (!anchor || !panelRef.current) return;
    const rect = anchor.getBoundingClientRect();
    const panelWidth = panelRef.current.offsetWidth;

    // Center the panel horizontally under the button
    const left = Math.max(
        8,
        Math.min(
            rect.left + window.scrollX + rect.width / 2 - panelWidth / 2,
            window.innerWidth - panelWidth - 8
        ));
    const top = rect.bottom + window.scrollY + 8; // 8px gap

    setPos({ top, left });
  };

  update();
  window.addEventListener("resize", update);
  window.addEventListener("scroll", update, true);

  return () => {
    window.removeEventListener("resize", update);
    window.removeEventListener("scroll", update, true);
  };
}, [anchor]);


  // click outside to close
  useEffect(() => {
    function handle(e: MouseEvent) {
      const tgt = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(tgt) && !anchor?.contains(tgt)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose, anchor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleSelectOrg = (org: string) => {
    setFilters((p) => ({ ...p, organization: org }));
    setOpenOrgList(false);
  };

  // If no anchor (safety) - don't render
  if (!anchor) return null;

  const panel = (
    <div
      ref={panelRef}
      className={styles.panelPopover}
      style={{ top: pos.top, left: pos.left }}
      role="dialog"
      aria-label="Filter users"
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
              onClick={() => setOpenOrgList((s) => !s)}
            >
              {filters.organization || "Select organization"}
              <ChevronDown size={16} className={`${styles.icon} ${openOrgList ? styles.rotate : ""}`} />
            </button>

            {openOrgList && (
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
        <input name="username" value={filters.username} onChange={handleChange} placeholder="User" />
      </div>

      {/* Email */}
      <div className={styles.formGroup}>
        <label className={styles.detail}>Email</label>
        <input name="email" value={filters.email} onChange={handleChange} placeholder="Email" />
      </div>

      {/* Date */}
      <div className={styles.formGroup}>
        <label className={styles.detail}>Date</label>
        <input type="date" name="date" value={filters.date} onChange={handleChange} />
      </div>

      {/* Phone */}
      <div className={styles.formGroup}>
        <label className={styles.detail}>Phone Number</label>
        <input name="phone" value={filters.phone} onChange={handleChange} placeholder="Phone Number" />
      </div>

      {/* Status */}
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
        </div>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => {
            setFilters({ organization: "", username: "", email: "", date: "", phone: "", status: "" });
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

  return createPortal(panel, document.body);
}
