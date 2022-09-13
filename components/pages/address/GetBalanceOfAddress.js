import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { Spin, message, Card } from "antd";
import qs from "qs";
import { ETHER_URL } from "@/utils/constants";
import { Box, Flex } from "@/components/atoms";

const queryString = {
  module: "account",
  action: "balance",
  tag: "latest",
};
const query = qs.stringify(queryString);

export default function GetBalanceOfAddress({ addressHash = "" }) {
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
        console.log("Ether", ethers.utils.formatEther(response.data.result));
        setEthBalance(ethers.utils.formatEther(response.data.result));
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
    <Flex>
      <Box width="50%">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Card size="small" title="Overview" style={{ width: 300 }}>
            <span>Balance: {ethBalance} Ether</span>
          </Card>
        )}
      </Box>
      <Box width="50%" />
    </Flex>
  );
}
