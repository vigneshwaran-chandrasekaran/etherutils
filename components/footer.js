import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <span>Proudly made in &nbsp;</span><Image src="/india.png" alt="India Flag" width={32} height={32} /><span>&nbsp;by Vigneshwaran Chandrasekaran</span>
    </footer>
  );
}
