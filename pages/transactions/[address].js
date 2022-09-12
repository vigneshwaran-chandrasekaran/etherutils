import React from "react";
import {  Input, Divider } from "antd";
import { useRouter } from "next/router";
import GetTransactions from "@/components/pages/transactions/GetTransactions";
import { Flex, Text } from "@/components/atmos";

export default function Transactions() {
  const router = useRouter();
  console.log("router", router);
  const { address } = router.query;
  return (
    <div>
      <Flex alignItems="center" justifyContent="flex-start">
        <Text minWidth="180px">Latest 10 Transactions of</Text>
        <Input value={address} />
      </Flex>
      <Divider plain />
      <GetTransactions address={address} />
    </div>
  );
}
