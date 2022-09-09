import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { Input, Button, Spin, message } from "antd";
import {
  ETHER_URL,
  SAMPLE_SINGLE_ADDREESS,
  SAMPLE_MULTIPLE_ADDRESS,
} from "@/utils/constants";

console.log("NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);

export default function GetBalanceOfAddress() {
  const [addressData, setAddressData] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function getAddress() {
    const url = `${ETHER_URL}&module=account&action=balance&address=${addressData}&tag=latest`;
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

  return (
    <div>
      <p>{SAMPLE_SINGLE_ADDREESS}</p>
      <p>{SAMPLE_MULTIPLE_ADDRESS}</p>
      {isLoading ? <Spin size="large" /> : <p>{ethBalance}</p>}
      <Input
        placeholder="Address"
        onChange={(e) => setAddressData(e.target.value)}
      />
      <Button type="primary" onClick={getAddress}>
        Get Balance
      </Button>
    </div>
  );
}
