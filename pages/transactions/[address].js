import React from "react";
import { useRouter } from "next/router";
import GetTransactions from '@/components/pages/transactions/GetTransactions';

export default function Transactions() {
  const router = useRouter();
  const { address } = router.query;
  return (
    <div>
      <p>Latest transactions of: {address}</p>
      <GetTransactions address={address} />
    </div>
  );
}
