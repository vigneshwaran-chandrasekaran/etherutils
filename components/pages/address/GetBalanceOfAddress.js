import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { Spin, message, Card } from "antd";
import qs from "qs";
import { ETHER_URL } from "@/utils/constants";
import { Box, Flex, Text } from "@/components/atoms";

const queryString = {
  module: "account",
  action: "balance",
  tag: "latest",
};
const query = qs.stringify(queryString);

export default function GetBalanceOfAddress({ addressHash, addressInfo = {} }) {
  console.log("GetBalanceOfAddress");
  const [ethBalance, setEthBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function getBalance(addressData) {
    const url = `${ETHER_URL}&address=${addressData}&${query}`;
    console.log("url", url);
    setIsLoading(true);

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          console.log("Ether", ethers.utils.formatEther(response.data.result));
          setEthBalance(ethers.utils.formatEther(response.data.result));
        }
      })
      .catch((e) => {
        console.log("e", e);
        message.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    console.log("addressHash useEffect", addressHash);
    if (addressHash) {
      getBalance(addressHash);
    }
  }, [addressHash]);

  return (
    <Flex width="100%">
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Box width="30%" rounded title="Overview">
          <Text as="p" fontWeight="bold">
            Overview
          </Text>
          <p>Balance: {ethBalance} Ether</p>
          <p>Total Received: {addressInfo?.total_received} Ether</p>
          <p>Total Sent: {addressInfo?.total_sent} Ether</p>
        </Box>
      )}
    </Flex>
  );
}
