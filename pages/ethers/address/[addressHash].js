import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { ETHERSCAN_API_KEY, INFURA_API_KEY } from "@/utils/constants";

const address = "0x00000000219ab540356cbb839cbe05303d7705fa";

const etherjs = async () => {
  const provider = new ethers.providers.EtherscanProvider(
    "homestead",
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
  console.log("getDefaultProvider", ethers.getDefaultProvider());
  console.log("getNetwork by name", await provider.getNetwork("homestead"));
  console.log("getNetwork by number", await provider.getNetwork(2));
  console.log("getCode", await provider.getCode(address));
  console.log("address", address);
  console.log("hexBalance", hexBalance);
  console.log("balance", balance);
  console.log("Avatar", Avatar);
};

export default function Ether() {
  const router = useRouter();
  const { addressHash } = router.query;

  console.log("addressHash", addressHash);

  useEffect(() => {
    etherjs();
  }, []);

  return <div>index ethers {address}</div>;
}
