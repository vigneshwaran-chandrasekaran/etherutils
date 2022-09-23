import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";
import qs from "qs";
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { ETHERSCAN_API_KEY, ETHER_URL } from "@/utils/constants";

// const contract = "0xF43Aa730d29738A26Ea2Ab700b3a2a604574E089";

// https://youtu.be/dArGajlpng0

const queryString = {
  module: "contract",
  action: "getabi",
};

const query = qs.stringify(queryString);
console.log("queryString", query);

const etherjs = async (contractHash, abi) => {
  const provider = new ethers.providers.EtherscanProvider(
    "homestead",
    ETHERSCAN_API_KEY
  );

  const contract = new ethers.Contract(contractHash, abi, provider);

  console.log("contract abi data ----", contract);

  const name = await contract.name();
  const totalSupply = await contract.totalSupply();
  const ERCtradingV2Router = await contract.ERCtradingV2Router();
  const address = await contract.address;

  console.log("contract name  ----", name);
  console.log("contract totalSupply  ----", totalSupply.toString());
  console.log("contract ERCtradingV2Router  ----", ERCtradingV2Router);
  console.log("contract address  ----", address);
};

export default function Ether() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const { contractHash } = router.query;

  console.log("contractHash", contractHash);

  function getABI(contractHash) {
    const url = `${ETHER_URL}&address=${contractHash}&${query}`;
    console.log("url", url);
    setIsLoading(true);

    axios
      .get(url)
      .then((response) => {
        const abi = JSON.parse(response.data.result);
        console.log("getABI response", abi);

        etherjs(contractHash, abi);
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
    if (contractHash) {
      getABI(contractHash);
    }
  }, [contractHash]);

  return (
    <div>
      {!isEmpty(data) && (
        <Descriptions title={"Address " + contractHash} bordered column={1}>
          {Object.keys(data).map((key) => (
            <Descriptions.Item key={key} label={key}>
              {data[key]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      )}
    </div>
  );
}
