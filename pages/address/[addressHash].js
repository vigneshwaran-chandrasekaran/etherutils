import React from "react";
import { Input, Divider, Tabs } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import {
  GetTransactions,
  InternalTransactions,
  GetBalanceOfAddress,
} from "@/components/pages/address";
import { Box, Flex, Text } from "@/components/atoms";

export default function Transactions({ addressInfo = {} }) {
  const router = useRouter();
  const { addressHash } = router.query;
  console.log("Transactions addressHash", addressHash);
  console.log("Transactions addressInfo", addressInfo);

  if (router.fallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <GetBalanceOfAddress
        addressInfo={addressInfo}
        addressHash={addressHash}
      />
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

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps(context) {
  const { params } = context;
  const url = `https://api.blockcypher.com/v1/eth/main/addrs/${params.addressHash}/balance`;
  const response = await axios.get(url);

  console.log("data.response", response.data);

  return {
    props: {
      addressInfo: response.data || {},
    },
  };
}
