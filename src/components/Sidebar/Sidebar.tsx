"use client";
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import logo from "@/assets/images/logo.svg";
import styles from "./Sidebar.module.scss";

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("users");
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
    }
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
    }
    
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
    }
  ];


  return (
    <aside
      className={clsx(styles.sidebar, isOpen && styles.open)}
      aria-label="Sidebar"
    >
      <div className={styles.logo}>
        <Image src={logo} alt="Lendsqr logo" width={140} height={40} />
      </div>
      

      <nav>
        <div className={styles.topMenu}>
          {menuItems.map(item => (
            <div
              key={item.id}
              className={clsx(styles.navItem, { [styles.active]: activeItem === item.id })}
              onClick={() => setActiveItem(item.id)}
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
        
      </nav>
    </aside>
  );
}
