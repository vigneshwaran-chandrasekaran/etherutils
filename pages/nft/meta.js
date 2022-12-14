import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Typography } from "antd";
import { Box, Flex } from "@/components/atoms";

const { Title } = Typography;

export default function Meta() {
  const router = useRouter();
  const [NFTsMetaData, setNFTsMetaData] = useState({});
  const [contractMetadata, setContractMetadata] = useState({});
  const { contractAddress, tokenId } = router.query;

  const getNFTMetadata = useCallback((contractAddress, tokenId) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_ALCHEMY_API_URL}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenId}`
      )
      .then((response) => {
        console.log(response.data);
        setNFTsMetaData(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  const getOwnersForToken = useCallback((contractAddress, tokenId) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_ALCHEMY_API_URL}/getOwnersForToken?contractAddress=${contractAddress}&tokenId=${tokenId}`
      )
      .then((response) => {
        console.log(response.data);
        setNFTsMetaData(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  const getContractMetadata = useCallback((contractAddress) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_ALCHEMY_API_URL}/getContractMetadata?contractAddress=${contractAddress}`
      )
      .then((response) => {
        console.log(response.data);
        setContractMetadata(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  const getNFTsForCollection = useCallback((contractAddress) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_ALCHEMY_API_URL}/getNFTsForCollection?contractAddress=${contractAddress}`
      )
      .then((response) => {
        console.log(response.data);
        setContractMetadata(response.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  useEffect(() => {
    if (contractAddress && tokenId) {
      getNFTMetadata(contractAddress, tokenId);
      getOwnersForToken(contractAddress, tokenId);
    }
    if (contractAddress) {
      getContractMetadata(contractAddress);
      getNFTsForCollection(contractAddress);
    }
  }, [
    getNFTMetadata,
    getContractMetadata,
    getNFTsForCollection,
    getOwnersForToken,
    contractAddress,
    tokenId,
  ]);

  console.log("NFTsMetaData", NFTsMetaData);
  console.log("contractMetadata", contractMetadata);

  return (
    <Box>
      <Flex justifyContent="space-between" mb="2rem">
        <Box>
          <Title level={4}>Contract Address</Title>
          <Title level={5}>{contractAddress}</Title>
        </Box>
        <Box>
          <Title level={4}>Token Id</Title>
          <Title level={5}>{tokenId}</Title>
        </Box>
      </Flex>
      <table className="w-100">
        <thead>
          <tr>
            <th colSpan={4}>Contract Meta Data</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Token Type</th>
            <th>Total Supply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{NFTsMetaData?.contractMetadata?.name}</td>
            <td>{NFTsMetaData?.contractMetadata?.symbol}</td>
            <td>{NFTsMetaData?.contractMetadata?.tokenType}</td>
            <td>{NFTsMetaData?.contractMetadata?.totalSupply}</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
}
