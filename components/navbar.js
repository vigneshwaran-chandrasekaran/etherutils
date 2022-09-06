import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Navbar() {
  return (
    <footer className={styles.footer}>
      EtherUtils
      <span className={styles.logo}>
        <Image src="/ethereum.svg" alt="Vercel Logo" width={48} height={48} />
      </span>
    </footer>
  );
}
