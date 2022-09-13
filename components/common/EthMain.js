import React, { useState, useEffect } from "react";
import axios from "axios";
import { Divider } from "antd";
import { Text, Flex } from "@/components/atoms";

export default function EthMain() {
  const [mainRecord, setMainRecord] = useState({});
  const [subRecord, setSubRecord] = useState({});

  function getSubRecord(latest_url) {
    axios
      .get(latest_url)
      .then((response) => {
        setSubRecord(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  useEffect(() => {
    axios
      .get("https://api.blockcypher.com/v1/eth/main")
      .then((response) => {
        console.log(response.data);
        setMainRecord(response.data);
        getSubRecord(response.data?.latest_url);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  return (
    <div>
      <div>
        {Object.keys(mainRecord).map((key) => (
          <Flex key={key}>
            <Text
              fontWeight="bold"
              pb="1rem"
              mr="1rem"
              textTransform="capitalize"
            >
              {key}
            </Text>
            <Text maxWidth="800px" pb="1rem">
              {mainRecord[key]}
            </Text>
          </Flex>
        ))}
      </div>
      <Divider plain />
      <div>
        {Object.keys(subRecord).map((key) => (
          <Flex key={key}>
            <Text
              fontWeight="bold"
              pb="1rem"
              mr="1rem"
              textTransform="capitalize"
            >
              {key}
            </Text>
            <Text maxWidth="800px" pb="1rem" truncate>
              {subRecord[key]}
            </Text>
          </Flex>
        ))}
      </div>
    </div>
  );
}
