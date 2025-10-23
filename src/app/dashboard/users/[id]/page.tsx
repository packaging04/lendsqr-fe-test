"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./UserDetails.module.scss";
import Image from "next/image";
import { User } from "@/hooks/useUsers";

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Load user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selectedUser");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // No user stored → fallback
        router.push("/dashboard");
      }
    }
  }, [router]);

  if (!user) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.skeletonCard}>
          <div className={styles.skeletonAvatar}></div>
          <div className={styles.skeletonTextGroup}>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
          </div>
        </div>

        <div className={styles.skeletonTabs}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeletonTab}></div>
          ))}
        </div>

        <div className={styles.skeletonSections}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.skeletonSection}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonGrid}>
                {[...Array(6)].map((_, j) => (
                  <div key={j} className={styles.skeletonLine}></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className={styles.userDetails}>
      {/* === Header Section === */}
      <div className={styles.topSection}>
        <div className={styles.backBtn} onClick={() => router.back()}>
          <Image src="/icons/np_back.png" alt="Back" width={30} height={30} />
          <span>Back to Users</span>
        </div>

        <div className={styles.headerActions}>
          <span className={styles.topTitle}>User Details</span>
          <div className={styles.buttons}>
            <button className={`${styles.btn} ${styles.blacklist}`}>Blacklist User</button>
            <button className={`${styles.btn} ${styles.activate}`}>Activate User</button>
          </div>
        </div>
      </div>

      {/* === User Summary Card === */}
      <div className={styles.summaryCard}>
        <div className={styles.left}>
          <div className={styles.avatar}>
            <Image src="/icons/user_avatar.png" alt="Avatar" width={100} height={100} />
          </div>
          <div className={styles.basicInfo}>
            <h3>{user.username}</h3>
            <p>{user.id}</p>
          </div>
        </div>

        <div className={styles.middle}>
          <p className={styles.label}>User’s Tier</p>
          <div className={styles.stars}>
            <Image src="/icons/np_star_full.png" alt="Star" width={16} height={16} />
            <Image src="/icons/np_star_not_full.png" alt="Star" width={16} height={16} />
            <Image src="/icons/np_star_not_full.png" alt="Star" width={16} height={16} />
          </div>
        </div>

        <div className={styles.right}>
          <h3>₦200,000.00</h3>
          <p>9912345678 / Providus Bank</p>
        </div>
      </div>

      {/* === Tabs Section === */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>General Details</button>
        <button className={styles.tab}>Documents</button>
        <button className={styles.tab}>Bank Details</button>
        <button className={styles.tab}>Loans</button>
        <button className={styles.tab}>Savings</button>
        <button className={styles.tab}>App and System</button>
      </div>

      {/* === Tab Content (General Details only for now) === */}
      <div className={styles.tabContent}>
        <section className={styles.infoSection}>
          <h4 className={styles.title} >Personal Information</h4>
          <div className={styles.infoGrid}>
            <div>
              <p className={styles.label}>Full Name</p>
              <p className={styles.value}>{user.username}</p>
            </div>
            <div>
              <p className={styles.label}>Phone Number</p>
              <p className={styles.value}>{user.phone}</p>
            </div>
            <div>
              <p className={styles.label}>Email Address</p>
              <p className={styles.value}>{user.email}</p>
            </div>
            <div>
              <p className={styles.label}>BVN</p>
              <p className={styles.value}>{user.profileDetails.bvn}</p>
            </div>
            <div>
              <p className={styles.label}>Gender</p>
              <p className={styles.value}>{user.profileDetails.gender}</p>
            </div>
            <div>
              <p className={styles.label}>Marital Status</p>
              <p className={styles.value}>{user.profileDetails.maritalStatus}</p>
            </div>
            <div>
              <p className={styles.label}>Children</p>
              <p className={styles.value}>{user.profileDetails.children}</p>
            </div>
            <div>
              <p className={styles.label}>Type of Residence</p>
              <p className={styles.value}>{user.profileDetails.residence}</p>
            </div>
          </div>
        </section>
        <section className={styles.infoSection}>
          <h4 className={styles.title} >Education and Employment</h4>
          <div className={styles.infoGrid2}>
            <div>
              <p className={styles.label}>Level of Education</p>
              <p className={styles.value}>{user.education.level}</p>
            </div>
            <div>
              <p className={styles.label}>Employment Status</p>
              <p className={styles.value}>{user.education.employmentStatus}</p>
            </div>
            <div>
              <p className={styles.label}>Sector of Employment</p>
              <p className={styles.value}>{user.education.sector}</p>
            </div>
            <div>
              <p className={styles.label}>Duration of Employment</p>
              <p className={styles.value}>{user.education.duration}</p>
            </div>
            <div>
              <p className={styles.label}>Office Email</p>
              <p className={styles.value}>{user.education.officeEmail}</p>
            </div>
            <div>
              <p className={styles.label}>Monthly Income</p>
              <p className={styles.value}>{user.education.monthlyIncome}</p>
            </div>
            <div>
              <p className={styles.label}>Loan Repayment</p>
              <p className={styles.value}>{user.education.loanRepayment}</p>
            </div>
          </div>
        </section>
        <section className={styles.infoSection}>
          <h4 className={styles.title}>Socials</h4>
          <div className={styles.infoGrid}>
            <div>
              <p className={styles.label}>Twitter</p>
              <p className={styles.value}>{user.socials.twitter}</p>
            </div>
            <div>
              <p className={styles.label}>Facebook</p>
              <p className={styles.value}>{user.socials.facebook}</p>
            </div>
            <div>
              <p className={styles.label}>Instagram</p>
              <p className={styles.value}>{user.socials.instagram}</p>
            </div>
          </div>
        </section>
        <section className={styles.infoSection}>
          <h4 className={styles.title}>Guarantor</h4>
          <div className={styles.infoGrid}>
            <div>
              <p className={styles.label}>Full Name</p>
              <p className={styles.value}>{user.guarantor.fullName}</p>
            </div>
            <div>
              <p className={styles.label}>Phone Number</p>
              <p className={styles.value}>{user.guarantor.phoneNumber}</p>
            </div>
            <div>
              <p className={styles.label}>Email Address</p>
              <p className={styles.value}>{user.guarantor.email}</p>
            </div>
            <div>
              <p className={styles.label}>Relationship</p>
              <p className={styles.value}>{user.guarantor.relationship}</p>
            </div>
          </div>
        </section>
         <section className={styles.infoSection}>
          <h4 className={styles.title}>&nbsp;</h4>
          <div className={styles.infoGrid}>
            <div>
              <p className={styles.label}>Full Name</p>
              <p className={styles.value}>{user.guarantor.fullName}</p>
            </div>
            <div>
              <p className={styles.label}>Phone Number</p>
              <p className={styles.value}>{user.guarantor.phoneNumber}</p>
            </div>
            <div>
              <p className={styles.label}>Email Address</p>
              <p className={styles.value}>{user.guarantor.email}</p>
            </div>
            <div>
              <p className={styles.label}>Relationship</p>
              <p className={styles.value}>{user.guarantor.relationship}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
