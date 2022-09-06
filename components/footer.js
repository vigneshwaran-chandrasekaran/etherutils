import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/vigneshwaran-chandrasekaran"
        target="_blank"
        rel="noopener noreferrer"
      >
        Vigneshwaran
        <span className={styles.logo}>
          <Image src="/ethereum.svg" alt="Vercel Logo" width={48} height={48} />
        </span>
      </a>
    </footer>
  );
}
