import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="footer">
      <FontAwesomeIcon icon={faRocket} /> &nbsp;
      <span>Proudly Made In &nbsp; </span>
      <Image src="/india.png" alt="India Flag" width={32} height={32} />
      <span>
        &nbsp;by&nbsp;
        <Link href="https://github.com/vigneshwaran-chandrasekaran">
          <a target="_blank" rel="noopener noreferrer">
            Vigneshwaran Chandrasekaran
          </a>
        </Link>
      </span>
    </footer>
  );
}
