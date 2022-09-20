import React from "react";
import Head from "next/head";
import { EthMain, Ethplorer } from "@/components/common";
import { TopTokens, NewTokens, TopTokensByCapitalization } from "@/components/ethplorer";

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
      <TopTokens />
      <NewTokens />
      <TopTokensByCapitalization />
      <EthMain />
      <Ethplorer />
    </div>
  );
}
