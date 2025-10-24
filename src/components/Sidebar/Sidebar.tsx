"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import styles from "./Sidebar.module.scss";
import { PanelLeft } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("users");
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // Will close when clicking outside on mobile (only active when open)
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      const sidebar = document.getElementById("app-sidebar");
      const toggleBtn = document.getElementById("sidebarToggleBtn");
      if (
        sidebar &&
        !sidebar.contains(e.target as Node) &&
        toggleBtn &&
        !toggleBtn.contains(e.target as Node)
      ) {
        setOpen(false);
        if (onClose) onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const toggleSidebar = () => {
    setOpen((prev) => {
      const next = !prev;
      if (!next && onClose) {
        // if closing, notify parent (non-invasive)
        onClose();
      }
      return next;
    });
  };

  const handleMenuClick = (id: string) => {
    setActiveItem(id); 
    router.push("/dashboard"); // navigate to dashboard
  };


  const menuItems = [
    {
      label: "Switch Organization",
      icon: "/icons/briefcase.png",
      id: "org",
    },
    {
      label: "Dashboard",
      icon: "/icons/home.png",
      id: "dashboard",
    },
  ];

  const customerItems = [
    {
      label: "Users",
      icon: "/icons/user-friends.png",
      id: "userfriend",
      width: 16,
      height: 12.8,
    },
    {
      label: "Guarantors",
      icon: "/icons/guarantor.png",
      id: "guarantors",
      width: 16,
      height: 12.8,
    },
    {
      label: "Loans",
      icon: "/icons/sack.png",
      id: "loans",
      width: 16,
      height: 16,
    },
    {
      label: "Decision Models",
      icon: "/icons/handshake.png",
      id: "decision",
      width: 19,
      height: 15.2,
    },
    {
      label: "Savings",
      icon: "/icons/savings.png",
      id: "savings",
      width: 16,
      height: 14.22,
    },
    {
      label: "Loan Requests",
      icon: "/icons/loanrequests.png",
      id: "loanrequests",
      width: 18,
      height: 22,
    },
    {
      label: "Whitelist",
      icon: "/icons/white.png",
      id: "white",
      width: 16,
      height: 12.8,
    },
    {
      label: "Karma",
      icon: "/icons/karma.png",
      id: "karma",
      width: 16,
      height: 12.8,
    },
  ];

  const businessItems = [
    {
      label: "Organization",
      icon: "/icons/briefcase.png",
      id: "organization",
      width: 16,
      height: 16,
    },
    {
      label: "Loan Products",
      icon: "/icons/loanrequests.png",
      id: "loanproducts",
      width: 18,
      height: 22,
    },
    {
      label: "Savings Product",
      icon: "/icons/savingsproduct.png",
      id: "savingsproduct",
      width: 16,
      height: 16,
    },
    {
      label: "Fees and Charges",
      icon: "/icons/feesandcharges.png",
      id: "feesandcharges",
      width: 16,
      height: 16,
    },
    {
      label: "Transactions",
      icon: "/icons/transactions.png",
      id: "transactions",
      width: 16,
      height: 18,
    },
    {
      label: "Services",
      icon: "/icons/services.png",
      id: "services",
      width: 16,
      height: 16,
    },
    {
      label: "Service Account",
      icon: "/icons/serviceaccount.png",
      id: "serviceaccount",
      width: 16,
      height: 12.8,
    },
    {
      label: "Settlements",
      icon: "/icons/settlements.png",
      id: "settlements",
      width: 16,
      height: 12.8,
    },
    {
      label: "Reports",
      icon: "/icons/reports.png",
      id: "reports",
      width: 16,
      height: 16,
    },
  ];

  const settingsItems = [
    {
      label: "Preferences",
      icon: "/icons/preferences.png",
      id: "preferences",
      width: 16,
      height: 16,
    },
    {
      label: "Fees and Pricing",
      icon: "/icons/feesandpricing.png",
      id: "feesandpricing",
      width: 16,
      height: 16,
    },
    {
      label: "Audit Logs",
      icon: "/icons/auditlogs.png",
      id: "auditlogs",
      width: 16,
      height: 21.33,
    },
    {
      label: "System Messages",
      icon: "/icons/settings.png",
      id: "systemImage",
      width: 16,
      height: 16,
    },
  ];

  const signoutItems = [
    {
      label: "Logout",
      icon: "/icons/signout.png",
      id: "logout",
      width: 16,
      height: 16,
    }
  ];


  return (
    <>
      <button
        id="sidebarToggleBtn"
        className={styles.sidebarToggle}
        onClick={toggleSidebar}
        aria-label={open ? "Close sidebar" : "Open sidebar"}
        
      >
        <PanelLeft />
      </button>

      <aside
        id="app-sidebar"
        className={clsx(styles.sidebar, (isOpen || open) && styles.open)}
        aria-label="Sidebar"
      >
         <nav>
          <div className={styles.topMenu}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={clsx(styles.navItem, { [styles.active]: activeItem === item.id })}
                onClick={() => handleMenuClick}
              >
                <Image src={item.icon} alt={item.label} width={16} height={16} />
                <span className={styles.word}>{item.label}</span>
                {item.id === "org" && (
                  <Image
                    src="/icons/drop.png"
                    alt="Dropdown arrow"
                    width={14}
                    height={14}
                    className={styles.dropdownIcon}
                  />
                )}
              </div>
            ))}
          </div>

          <p className={styles.sectionLabel}>CUSTOMERS</p>
          {customerItems.map((item) => (
            <div
              key={item.id}
              className={clsx(styles.navItem, {
                [styles.active]: activeItem === item.id,
              })}
              onClick={() => setActiveItem(item.id)}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={item.width}
                height={item.height}
                className={styles.icon}
              />
              <span>{item.label}</span>
            </div>
          ))}

          <p className={styles.sectionLabel}>BUSINESSES</p>
          {businessItems.map((item) => (
            <div
              key={item.id}
              className={clsx(styles.navItem, {
                [styles.active]: activeItem === item.id,
              })}
              onClick={() => setActiveItem(item.id)}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={item.width}
                height={item.height}
                className={styles.icon}
              />
              <span>{item.label}</span>
            </div>
          ))}

          <p className={styles.sectionLabel}>SETTINGS</p>

          {settingsItems.map((item) => (
            <div
              key={item.id}
              className={clsx(styles.navItem, {
                [styles.active]: activeItem === item.id,
              })}
              onClick={() => setActiveItem(item.id)}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={item.width}
                height={item.height}
                className={styles.icon}
              />
              <span>{item.label}</span>
            </div>
          ))}

          <span className={styles.hrm}></span>

          {signoutItems.map((item) => (
            <div
              key={item.id}
              className={clsx(styles.navItem, {
                [styles.active]: activeItem === item.id,
              })}
              onClick={() => redirect("/login")}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={item.width}
                height={item.height}
                className={styles.icon}
              />
              <span className={styles.cologout}>{item.label}</span>
            </div>
          ))}

          <span className={styles.v2}>v1.2.0</span>

          
        </nav>
      </aside>
    </>
  );
}
