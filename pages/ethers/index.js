import React, { useEffect } from "react";
import { ethers } from "ethers";
import { ETHERSCAN_API_KEY, INFURA_API_KEY } from "@/utils/constants";

const address = "0xd24400ae8BfEBb18cA49Be86258a3C749cf46853";

const etherjs = async () => {
  const provider = new ethers.providers.EtherscanProvider(
    "rinkeby",
    ETHERSCAN_API_KEY
  );

//   const providers = ethers.getDefaultProvider("rinkeby", {
//     etherscan: ETHERSCAN_API_KEY,
//     infura: INFURA_API_KEY,
//   });
//   console.log("providers", providers);

  const hexBalance = await provider.getBalance(address);
  const balance = ethers.utils.formatEther(hexBalance);

  const Avatar = await provider.getAvatar(address);

  console.log("provider", provider);
  console.log("hexBalance", hexBalance);
  console.log("balance", balance);
  console.log("Avatar", Avatar);
};

export default function Ether() {
  useEffect(() => {
    etherjs();
  }, []);

  return <div>index ethers</div>;
}
