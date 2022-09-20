/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { Text, Table } from "@/components/atoms";
import { TopTokenDetailsExpandable } from "@/components/ethplorer";

export default function NewTokens() {
  const [tokensList, setTokensList] = useState([]);
  const [topTokenHolders, seTopTokenHolders] = useState([]);
  const [tokenHistory, setTokenHistory] = useState([]);

  const getTokensNew = useCallback(() => {
    const url = `${process.env.NEXT_PUBLIC_ETHPLORER_API_URL}/getTokensNew?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_IO_API_KEY}`;
    axios.get(url).then((res) => {
      console.log("getTokensNew ", res.data);
      setTokensList(res.data);
    });
  }, []);

  const getTopTokenHolders = useCallback((address) => {
    const url = `${process.env.NEXT_PUBLIC_ETHPLORER_API_URL}/getTopTokenHolders/${address}?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_IO_API_KEY}`;
    axios.get(url).then((res) => {
      console.log("getTopTokenHolders ", res.data);
      seTopTokenHolders(res.data.holders);
    });
  }, []);

  const getTokenHistoryGrouped = useCallback((address) => {
    const url = `${process.env.NEXT_PUBLIC_ETHPLORER_API_URL}/getTokenHistoryGrouped/${address}?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_IO_API_KEY}`;
    axios.get(url).then((res) => {
      console.log("getTokenHistoryGrouped ", res.data);
      setTokenHistory(res.data.tokens);
    });
  }, []);

  useEffect(() => {
    getTokensNew();
  }, [getTokensNew]);

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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <>
          {price?.rate && (
            <>
              <span>{price?.currency === "USD" ? "$" : price?.rate}</span>
              <span>{price?.rate?.toFixed(7)}</span>
            </>
          )}
        </>
      ),
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
      title: "Total Supply",
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
      render: (twitter) => (
        <>
          {twitter && (
            <Link href={`https://twitter.com/${twitter}`} passHref={true}>
              {twitter}
            </Link>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <h3>New Tokens</h3>
      <Table
        rowKey={(record) => record.symbol + record.address + record.image}
        columns={columns}
        dataSource={tokensList}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <TopTokenDetailsExpandable record={record} />
            </div>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
          onExpand: (expanded, record) => {
            console.log("expanded", expanded);
            console.log("record", record);
            if (expanded) {
              getTopTokenHolders(record.address);
              getTokenHistoryGrouped(record.address);
            }
          },
        }}
        size="small"
        pagination={{
          pageSize: 25,
          pageSizeOptions: ["10", "25", "50"],
        }}
      />
    </div>
  );
}