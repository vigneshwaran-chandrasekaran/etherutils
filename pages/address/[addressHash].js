import React from "react";
import { Input, Divider, Tabs } from "antd";
import { useRouter } from "next/router";
import {
  GetTransactions,
  InternalTransactions,
  GetBalanceOfAddress,
} from "@/components/pages/address";
import { Box, Flex, Text } from "@/components/atoms";

export default function Transactions() {
  const router = useRouter();
  const { addressHash } = router.query;
  console.log("Transactions addressHash", addressHash);

  return (
    <div>
      <GetBalanceOfAddress addressHash={addressHash} />
      <Divider plain />
      <Flex alignItems="center" justifyContent="flex-start">
        <Text minWidth="180px">Latest 25 Transactions of</Text>
        <Input value={addressHash} />
      </Flex>
      <Divider plain />
      <Box rounded>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: `Transactions`,
              key: "1",
              children: <GetTransactions address={addressHash} />,
            },
            {
              label: `Internal Transactions`,
              key: "2",
              children: <InternalTransactions address={addressHash} />,
            },
          ]}
        />
      </Box>
    </div>
  );
}
