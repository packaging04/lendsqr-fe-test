import React from "react";
import clsx from "clsx";
import styles from "./Badge.module.scss";

interface BadgeProps {
  status: string; // accept any string
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ status, className }) => {
  const normalizedStatus = status.toLowerCase();

  return (
    <span
      className={clsx(
        styles.badge,
        styles[normalizedStatus],
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default Badge;
