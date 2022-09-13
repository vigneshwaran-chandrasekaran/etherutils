import React from "react";
import {  Input, Divider } from "antd";
import { useRouter } from "next/router";
import {GetTransactions, InternalTransactions} from "@/components/pages/transactions";
import { Flex, Text } from "@/components/atmos";

export default function Transactions() {
  const router = useRouter();
  console.log("router", router);
  const { address } = router.query;
  return (
    <div>
      <Flex alignItems="center" justifyContent="flex-start">
        <Text minWidth="180px">Last 25 Transactions of</Text>
        <Input value={address} />
      </Flex>
      <Divider plain />
      <GetTransactions address={address} />
      <InternalTransactions address={address} />
    </div>
  );
}
