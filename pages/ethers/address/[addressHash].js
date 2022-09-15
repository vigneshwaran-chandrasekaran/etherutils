import React, { useEffect, useState } from "react";
import { Badge, Descriptions } from "antd";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { ETHERSCAN_API_KEY, INFURA_API_KEY } from "@/utils/constants";

// const address = "0x00000000219ab540356cbb839cbe05303d7705fa";

const etherjs = async (address) => {
  const provider = new ethers.providers.EtherscanProvider(
    "homestead",
    ETHERSCAN_API_KEY
  );

  const hexBalance = await provider.getBalance(address);

  return {
    "Transaction Count": await provider.getTransactionCount(address),
    Avatar: await provider.getAvatar(address),
    Balance: `${ethers.utils.formatEther(hexBalance)} Ether`,
    // Block: await provider.getBlock(100004),
  };
};

export default function Ether() {
  const router = useRouter();
  const [data, setData] = useState({});
  const { addressHash } = router.query;

  console.log("addressHash", addressHash);

  useEffect(() => {
    (async () => {
      if (addressHash) {
        const result = await etherjs(addressHash);
        console.log("result wewew", result);
        setData((prevState) => ({
          ...prevState,
          ...result,
        }));
      }
    })();
  }, [addressHash]);

  return (
    <div>
      {console.log("datas ", data)}
      {!isEmpty(data) && (
        <Descriptions title={"Address " + addressHash} bordered column={1}>
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
