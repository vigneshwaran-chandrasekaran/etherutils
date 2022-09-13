import React from "react";
import {  Input, Divider } from "antd";
import { useRouter } from "next/router";
import {GetTransactions, InternalTransactions} from "@/components/pages/address";
import { Flex, Text } from "@/components/atmos";

export default function Transactions() {
  const router = useRouter();
  console.log("router", router);
  const { addressHash } = router.query;
  return (
    <div>
      <Flex alignItems="center" justifyContent="flex-start">
        <Text minWidth="180px">Last 25 Transactions of</Text>
        <Input value={addressHash} />
      </Flex>
      <Divider plain />
      <GetTransactions address={addressHash} />
      <InternalTransactions address={addressHash} />
    </div>
  );
}
