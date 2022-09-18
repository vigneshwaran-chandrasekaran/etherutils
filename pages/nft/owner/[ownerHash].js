/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { Text, Table } from "@/components/atoms";

export default function Alchemy() {
  const [NFTsData, setNFTsData] = useState([]);
  const router = useRouter();
  const { ownerHash } = router.query;

  const getNFTs = useCallback((ownerHash) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_ALCHEMY_API_URL}/getNFTs?owner=${ownerHash}`
      )
      .then((response) => {
        console.log(response.data);
        setNFTsData(response.data.ownedNfts);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  useEffect(() => {
    if (ownerHash) {
      getNFTs(ownerHash);
    }
  }, [getNFTs, ownerHash]);

  const columns = [
    {
      title: "Contract Hash",
      dataIndex: "contract",
      key: "contract",
      render: (_, record) => (
        <Link href={`/address/${record?.contract?.address}`}>
          <a>
            <Text width="150px" truncate title={record?.contract?.address}>
              {record?.contract?.address}
            </Text>
          </a>
        </Link>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => <span>{title}</span>,
    },
    {
      title: "Media",
      dataIndex: "title",
      key: "title",
      render: (title, record) => (
        <div>
          {record?.media?.[0]?.gateway && (
            <img
              src={record?.media?.[0]?.gateway}
              alt={title}
              width={96}
              height={96}
            />
          )}
        </div>
      ),
    },
    {
      title: "Symbol",
      dataIndex: "title",
      key: "title",
      render: (_, record) => <span>{record?.contractMetadata?.symbol}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => <Text maxWidth="250px">{description}</Text>,
    },
    {
      title: "Last Updated",
      dataIndex: "timeLastUpdated",
      key: "timeLastUpdated",
      render: (timeLastUpdated) => (
        <div>
          <Text fontSize="10px">
            {moment.utc(timeLastUpdated).local().format("DD MMM YYYY HH:mm A")}
          </Text>
          <Text fontSize="10px">
            {moment.utc(timeLastUpdated).local().fromNow()}
          </Text>
        </div>
      ),
    },
    {
      title: <Text textAlign="center">Get Meta Data</Text>,
      dataIndex: "contract",
      key: "contract",
      render: (_, record) => (
        <div>
          <Link
            href={`/nft/meta?contractAddress=${record?.contract?.address}&tokenId=${record?.id?.tokenId}`}
          >
            <a>
              <EyeOutlined /> Click here to view more
            </a>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Table
      rowKey={(record) =>
        record.contract.address +
        record.contract.title +
        record.timeLastUpdated +
        record.description +
        record.id.tokenId
      }
      columns={columns}
      dataSource={NFTsData}
      size="small"
    />
  );
}
