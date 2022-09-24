import React, { useEffect, useState } from "react";
import { Tabs, message, Collapse, Input, Button } from "antd";
import qs from "qs";
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { ETHERSCAN_API_KEY, ETHER_URL } from "@/utils/constants";
import { Box, Text } from "@/components/atoms";

const { Panel } = Collapse;

// const contract = "0xF43Aa730d29738A26Ea2Ab700b3a2a604574E089";

// https://youtu.be/dArGajlpng0

const queryString = {
  module: "contract",
  action: "getabi",
};
const query = qs.stringify(queryString);

const getContractDetails = async (contractHash, abi = []) => {
  const provider = new ethers.providers.EtherscanProvider(
    "homestead",
    ETHERSCAN_API_KEY
  );
  const contract = new ethers.Contract(contractHash, abi, provider);
  const readContract = abi?.filter((item) =>
    ["view", "pure"].includes(item?.stateMutability)
  );
  const writeContract = abi?.filter(
    (item) => !["view", "pure"].includes(item?.stateMutability)
  );
  return { readContract, writeContract, contract };
};

function EachReadData({ contract, keyName, current }) {
  const [data, setData] = useState("");

  useEffect(() => {
    console.log("current", current);
    async function fetchData() {
      const result = await contract[keyName]();
      setData(result?.toString());
    }
    if ((contract, keyName, current?.inputs?.length === 0)) {
      fetchData();
    }
  }, [contract, keyName, current]);

  function handleQuery() {
    console.log("handleQuery", current?.inputs);
  }

  return (
    <div>
      {data}
      <div>
        {current?.inputs?.length > 0 && (
          <>
            {current?.inputs?.map((item) => (
              <Box key={item?.name} mb="0.5rem">
                <label htmlFor={item?.name}>
                  {item?.name} ({item?.type})
                </label>
                <Box mt="0.25rem">
                  <Input
                    type="text"
                    id={item?.name}
                    placeholder={`${item?.name} (${item?.type})`}
                    onChange={(e) => {
                      console.log(e.target.value);
                      item.value = e.target.value;
                    }}
                  />
                </Box>
              </Box>
            ))}
            <Box mt="0.5rem">
              <Button onClick={handleQuery}>Query</Button>
            </Box>
          </>
        )}
      </div>
    </div>
  );
}

export default function Ether() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [contractData, setContractData] = useState({});
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

        (async function () {
          const contractInfo = await getContractDetails(contractHash, abi);
          console.log("contractInfo", contractInfo);
          setContractData(contractInfo);
        })();
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
    console.log("is Valid address", ethers.utils.isAddress(contractHash));
    if (ethers.utils.isAddress(contractHash)) {
      getABI(contractHash);
    }
  }, [contractHash]);

  return (
    <div>
      {ethers.utils.isAddress(contractHash) ? (
        <Tabs
          defaultActiveKey="read"
          items={[
            {
              label: `Read Contract`,
              key: "read",
              children: (
                <Box>
                  {!isEmpty(contractData?.readContract) && (
                    <Collapse defaultActiveKey={["1"]}>
                      {Object.keys(contractData?.readContract).map((key) => (
                        <Panel
                          key={key}
                          header={`${Number(key) + 1}. ${
                            contractData?.readContract?.[key]?.name
                          }`}
                          showArrow={false}
                        >
                          <EachReadData
                            contract={contractData?.contract}
                            keyName={contractData?.readContract?.[key]?.name}
                            current={contractData?.readContract?.[key]}
                          />
                        </Panel>
                      ))}
                    </Collapse>
                  )}
                </Box>
              ),
            },
            {
              label: `Write Contract`,
              key: "write",
              children: (
                <Box>
                  {!isEmpty(contractData?.readContract) && (
                    <Collapse defaultActiveKey={["1"]}>
                      {Object.keys(contractData?.readContract).map((key) => (
                        <Panel
                          key={key}
                          header={`${Number(key) + 1}. ${
                            contractData?.readContract?.[key]?.name
                          }`}
                          showArrow={false}
                        >
                          <EachReadData
                            contract={contractData?.contract}
                            keyName={contractData?.readContract?.[key]?.name}
                            current={contractData?.readContract?.[key]}
                          />
                        </Panel>
                      ))}
                    </Collapse>
                  )}
                </Box>
              ),
            },
          ]}
        />
      ) : (
        <Text as="h2" textAlign="center">
          Not a valid address
        </Text>
      )}
    </div>
  );
}
