import React from "react";
import Head from "next/head";
import { EthMain } from "@/components/common";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ether Utils | EtherUtils</title>
        <meta
          name="description"
          content="Ether Utils | EtherUtils | Vigneshwaran Chandrasekaran"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EthMain />
    </div>
  );
}
