"use client";
import React, { useMemo, useRef, useState } from "react";
import styles from "./UserTable.module.scss";
import TableRow from "./TableRow";
import Image from "next/image";
import FilterPanel from "./FilterPanel";
import clsx from "clsx";
import { useUsers } from "@/hooks/useUsers";

/** Type for user rows */
export type User = {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: string; // Active | Inactive | Pending | Blacklisted
};


type Filters = {
  organization: string;
  username: string;
  email: string;
  phone: string;
  date: string;
  status: string;
};

export default function UserTable() {
  const { users, loading, error, refresh } = useUsers();
  // UI state
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<DOMRect | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);
  const [filterColumn, setFilterColumn] = useState<string | null>(null);

    const openFilter = (anchor: HTMLElement | null, column?: string) => {
    setFilterAnchor(anchor);
    setFilterColumn(column ?? null);
    setShowFilter(true);
    };

  const closeFilter = () => {
    setFilterAnchor(null);
    setFilterColumn(null);
    setShowFilter(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setIsSelectOpen(false);
    setPage(1);
  };

  const handleClick = () => {
    setIsSelectOpen((prev) => !prev);
  };


  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  // Sorting / Search
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    organization: "",
    username: "",
    email: "",
    phone: "",
    date: "",
    status: "",
  });
  const [sortBy, setSortBy] = useState<keyof User | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  
   const filtered = useMemo(() => {
    let src = users.slice();

    const q = search.trim().toLowerCase();
    if (q) {
      src = src.filter(
        (u) =>
          u.organization.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.toLowerCase().includes(q)
      );
    }

    src = src.filter((u) => {
      if (filters.organization && u.organization !== filters.organization)
        return false;
      if (
        filters.username &&
        !u.username.toLowerCase().includes(filters.username.toLowerCase())
      )
        return false;
      if (
        filters.email &&
        !u.email.toLowerCase().includes(filters.email.toLowerCase())
      )
        return false;
      if (filters.phone && !u.phone.includes(filters.phone)) return false;
      if (filters.status && u.status !== filters.status) return false;
      if (
        filters.date &&
        !u.dateJoined.toLowerCase().includes(filters.date.toLowerCase())
      )
        return false;
      return true;
    });

    if (sortBy) {
      src.sort((a, b) => {
        const valA = String(a[sortBy] ?? "").toLowerCase();
        const valB = String(b[sortBy] ?? "").toLowerCase();
        if (valA < valB) return sortDir === "asc" ? -1 : 1;
        if (valA > valB) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return src;
  }, [users, search, filters, sortBy, sortDir]);
  

  /** Pagination logic */
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage, rowsPerPage]);

  /** Handlers */
  
   const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  };
  const handleResetFilters = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      phone: "",
      date: "",
      status: "",
    });
    setPage(1);
  };

  const handleOpenMenu = (id: string, anchor: HTMLElement | null) => {
    if (openMenuId === id) {
        setOpenMenuId(null);
        return;
    }
    setOpenMenuId(id);
    setMenuAnchor(anchor?.getBoundingClientRect() || null);
    };

    const handleCloseMenu = () => {
    setOpenMenuId(null);
    setMenuAnchor(null);
    };

  const toggleSort = (key: keyof User) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  /** Convert sortDir to valid aria-sort values */
  const getAriaSort = (key: keyof User): "ascending" | "descending" | "none" => {
    if (sortBy !== key) return "none";
    return sortDir === "asc" ? "ascending" : "descending";
  };

    if (loading) {
        return (
            <div className={styles.tableCard}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Organization</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date Joined</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i} className={styles.skeletonRow}>
                    {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j}>
                        <div className={styles.skeletonLine}></div>
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        );
    }


  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.container} aria-labelledby="users-heading">
      <div className={styles.tableWrap}>
        <div className={styles.tableCard}>
          <table className={styles.table} role="table">
            <thead>
              <tr>
                {[
                  "organization",
                  "username",
                  "email",
                  "phone",
                  "dateJoined",
                  "status",
                ].map((key) => (
                  <th
                    key={key}
                    onClick={() => toggleSort(key as keyof User)}
                    aria-sort={getAriaSort(key as keyof User)}
                  >
                    <div className={styles.headCell}>
                      {key === "dateJoined"
                        ? "Date Joined"
                        : key.charAt(0).toUpperCase() + key.slice(1)}

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            // e.currentTarget is the button element — pass it as anchor
                            openFilter(e.currentTarget as HTMLElement, key);
                        }}
                        aria-label={`Open filter for ${key}`}
                         style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                margin: 0,
                                cursor: "pointer",
                                outline: "none",
                            }}
                    >
                      <Image
                        src="/icons/filter.png"
                        alt=""
                        width={16}
                        height={16}
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   setShowFilter(true);
                        // }}
                      />
                      </button>
                    </div>
                  </th>
                ))}
                <th aria-hidden="true"></th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: rowsPerPage }).map((_, i) => (
                  <tr className={styles.skeletonRow} key={i}>
                    <td colSpan={7}>
                      <div className={styles.skeletonLine} />
                    </td>
                  </tr>
                ))
              ) : pageItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.empty}>
                    No users found.
                  </td>
                </tr>
              ) : (
                pageItems.map((u) => (
                    <TableRow
                    key={u.id}
                    user={u}
                    isMenuOpen={openMenuId === u.id}
                    onOpenMenu={handleOpenMenu}
                    onCloseMenu={handleCloseMenu}
                    />
                ))
              )}
            </tbody>
          </table>
         
          {showFilter && (
            <FilterPanel
                anchor={filterAnchor}
                onClose={closeFilter}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
                organizations={users.map(u => u.organization)} // or users variable
                column={filterColumn}
            />
            )}
          {/* footer */}
          <div className={styles.tableFooter}>
                <div className={styles.leftFooter}>
                    <label className={styles.normalfont}>
                    Showing{" "}
                    <div className={styles.selectWrapper}>
                    <select
                        value={rowsPerPage}
                        onChange={handleChange}
                        onClick={handleClick}
                        onBlur={() => setIsSelectOpen(false)}
                    >
                        {[5, 10, 25, 50].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                        ))}
                    </select>

                    <Image
                        src="/icons/np_next.png"
                        alt="Dropdown arrow"
                        width={14}
                        height={14}
                         className={`${styles.dropdownIcon} ${
                            isSelectOpen ? styles.rotate : ""
                        }`}
                    />
                    </div>
                    out of {total}
                    </label>
                </div>

                <div className={styles.pagination}>
                    <button
                        className={styles.pageNav}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        <Image
                        src="/icons/prev.png"
                        alt="Previous page"
                        width={24}
                        height={24}
                        className={styles.arrowIcon}
                        />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                        .map((p, i, arr) => (
                        <React.Fragment key={p}>
                            {i > 0 && arr[i - 1] !== p - 1 && (
                            <span className={styles.ellipsis}>...</span>
                            )}
                            <button
                            onClick={() => setPage(p)}
                            className={clsx(styles.pageBtn, { [styles.pageActive]: p === page })}
                            >
                            {p}
                            </button>
                        </React.Fragment>
                        ))}

                    <button
                        className={styles.pageNav}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        <Image
                        src="/icons/next.png"
                        alt="Next page"
                        width={24}
                        height={24}
                        className={styles.arrowIcon}
                        />
                    </button>
                </div>


          </div>
        </div>
      </div>
    </section>
  );
}
