import Head from "next/head";
import GetBalanceOfAddress from "@/components/GetBalanceOfAddress";
import NormalTransactions from "@/components/NormalTransactions";

export default function Home() {
  return (
    <div>
      <NormalTransactions />
      <GetBalanceOfAddress />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
