import React from "react";
import { Input, Divider } from "antd";
import { useRouter } from "next/router";
import { Flex, Text } from "@/components/atoms";
import { InternalTransactionsOfHash } from "@/components/pages/tx";

export default function Transactions() {
  const router = useRouter();
  console.log("router", router);
  const { transactionHash } = router.query;
  console.log("transactionHash", transactionHash);

  return (
    <div>
      <Flex alignItems="center" justifyContent="flex-start">
        <Text minWidth="200px">Lastest Hash Transactions of</Text>
        <Input value={[transactionHash]} />
      </Flex>
      <Divider plain />
      <InternalTransactionsOfHash hash={transactionHash} />
    </div>
  );
}
