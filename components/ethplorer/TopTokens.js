/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { Text, Table } from "@/components/atoms";

export default function TopTokens() {
  const [tokensList, setTokensList] = useState([]);
  const getTopTokens = useCallback(() => {
    const url = `${process.env.NEXT_PUBLIC_ETHPLORER_API_URL}/getTopTokens?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_IO_API_KEY}`;
    axios.get(url).then((res) => {
      console.log("getTopTokens ", res.data);
      setTokensList(res.data.tokens);
    });
  }, []);

  useEffect(() => {
    getTopTokens();
  }, [getTopTokens]);

  const columns = [
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <div>
          {image && (
            <img
              src={`https://ethplorer.io/${image}`}
              alt={record.name}
              width={36}
              height={36}
            />
          )}
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name}</span>,
    },

    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => <span>{symbol}</span>,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <Link href={`/address/${address}`}>
          <a>
            <Text width="150px" truncate title={address}>
              {address}
            </Text>
          </a>
        </Link>
      ),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (owner) => (
        <Link href={`/address/${owner}`}>
          <a>
            <Text width="150px" truncate title={owner}>
              {owner}
            </Text>
          </a>
        </Link>
      ),
    },
    {
      title: "totalSupply",
      dataIndex: "totalSupply",
      key: "totalSupply",
      render: (totalSupply) => <span>{totalSupply}</span>,
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (website) => (
        <>
          {website && (
            <Link href={website} passHref={true}>
              {website}
            </Link>
          )}
        </>
      ),
    },
    {
      title: "Twitter",
      dataIndex: "twitter",
      key: "twitter",
    },
  ];

  return (
    <div>
      <Table
        rowKey={(record) => record.symbol + record.address + record.image}
        columns={columns}
        dataSource={tokensList}
        size="small"
      />
    </div>
  );
}
