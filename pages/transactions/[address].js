import React from "react";
import { useRouter } from "next/router";

export default function Transactions() {
  const router = useRouter();
  const { address } = router.query;
  return (
    <div>
      <p>Post: {address}</p>
      [address]
    </div>
  );
}
