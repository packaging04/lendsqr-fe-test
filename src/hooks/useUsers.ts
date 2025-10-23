"use client";
import { useEffect, useState } from "react";

export type RawJGUser = {
  id?: string;
  organization?: string;
  username?: string;
  email?: string;
  phone?: string;
  dateJoined?: string;
  status?: string;
  profile?: {
    company?: string;
    phone?: string;
  };
  createdAt?: string;
};

export type User = {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
};

type UseUsersReturn = {
  users: User[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const STATUS_VALUES: User["status"][] = ["Active", "Inactive", "Pending", "Blacklisted"];

export function useUsers(templateUrl = "https://api.json-generator.com/templates/u16T-BkqWksw/data"): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_JSON_GEN_TOKEN : process.env.NEXT_PUBLIC_JSON_GEN_TOKEN;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        throw new Error("Missing NEXT_PUBLIC_JSON_GEN_TOKEN in environment");
      }

      const res = await fetch(`${templateUrl}?access_token=${token}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch users (${res.status})`);
      }

      const data = (await res.json()) as RawJGUser[];
      const mapped: User[] = data.map((u, idx) => {
        const id = u.id ?? String(idx);
        const organization = u.organization ?? u.profile?.company ?? "Unknown Co";
        const username = u.username ?? "Unknown User";
        const email = u.email ?? `${username.replace(/\s+/g, ".").toLowerCase()}@example.com`;
        const phone = u.phone ?? u.profile?.phone ?? "+1 (555) 000-0000";
        const rawDate = u.dateJoined ?? u.createdAt ?? new Date().toISOString();
        // readable date format
        const dateJoined = (() => {
          try {
            const d = new Date(rawDate);
            if (!isNaN(d.getTime())) {
              const yyyy = d.getFullYear();
              const mm = String(d.getMonth() + 1).padStart(2, "0");
              const dd = String(d.getDate()).padStart(2, "0");
              return `${yyyy}-${mm}-${dd}`;
            }
          } catch {

          }
          return String(rawDate);
        })();

        const statusRaw = (u.status ?? STATUS_VALUES[idx % STATUS_VALUES.length]) as string;
        const status = ((): User["status"] => {
          const s = String(statusRaw).toLowerCase();
          if (s.includes("active")) return "Active";
          if (s.includes("inactive")) return "Inactive";
          if (s.includes("pending")) return "Pending";
          return "Blacklisted";
        })();

        return {
          id,
          organization,
          username,
          email,
          phone,
          dateJoined,
          status,
        };
      });

      setUsers(mapped);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    void fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    users,
    loading,
    error,
    refresh: fetchUsers,
  };
}
