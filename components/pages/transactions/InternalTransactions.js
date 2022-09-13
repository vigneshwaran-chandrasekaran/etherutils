import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import qs from "qs";
import moment from "moment";
import { message, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ETHER_URL } from "@/utils/constants";
import { getTime } from "@/utils/time";
import EachTransactionDetails from "@/components/pages/transactions/EachTransactionDetails";
import { Text, Table } from "@/components/atmos";

console.log("NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);

const queryString = {
  module: "account",
  action: "txlistinternal",
  startblock: 0,
  endblock: 99999999,
  page: 1,
  offset: 25,
  sort: "desc",
};
const query = qs.stringify(queryString);
console.log("queryString", query);

const columns = [
  {
    title: "Txn Hash",
    dataIndex: "hash",
    key: "hash",
    render: (hash) => (
      <Text width="150px" truncate title={hash}>
        {hash}
      </Text>
    ),
  },
  {
    title: "Block Number",
    dataIndex: "blockNumber",
    key: "blockNumber",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "TimeStamp",
    dataIndex: "timeStamp",
    key: "timeStamp",
    render: (timeStamp) => (
      <span title={getTime(timeStamp)}>
        {moment(getTime(timeStamp)).fromNow()}
      </span>
    ),
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: (from) => (
      <Link href={`/transactions/${from}`}>
        <a>
          <Text width="150px" truncate title={from}>
            {from}
          </Text>
        </a>
      </Link>
    ),
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    render: (to) => (
      <Link href={`/transactions/${to}`}>
        <a>
          <Text width="150px" truncate title={to}>
            {to}
          </Text>
        </a>
      </Link>
    ),
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Gas",
    dataIndex: "gas",
    key: "gas",
  },
  {
    title: "Gas Price",
    dataIndex: "gasPrice",
    key: "gasPrice",
  },
  {
    title: <Text textAlign="center">More Data</Text>,
    dataIndex: "timeStamp",
    key: "timeStamp",
    render: (timeStamp) => (
      <Text textAlign="center" cursor="pointer">
        <EyeOutlined />
      </Text>
    ),
  },
];

export default function InternalTransactions({ address = "" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [eachRowData, setEachRowData] = useState({});

  function getAddress(addressData) {
    const url = `${ETHER_URL}&address=${addressData}&${query}`;
    setIsLoading(true);

    axios
      .get(url)
      .then((response) => {
        setTableData(response.data.result);
      })
      .catch((e) => {
        message.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (address) {
      getAddress(address);
    }
  }, [address]);

  function handleCancel() {
    setIsModalVisible(false);
  }

  return (
    <div>
      {isLoading && <Spin size="large" />}
      {tableData?.length > 0 ? (
        <div>
          <h2>Internal Transactions</h2>
          <Table
            rowKey={(record) =>
              record.blockHash + record.blockNumber + record.hash
            }
            columns={columns}
            dataSource={tableData}
            // scroll={{ x: 1500 }}
            size="small"
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  setIsModalVisible(true);
                  setEachRowData(record);
                  console.log("record", record);
                  console.log("rowIndex", rowIndex);
                },
              };
            }}
          />
          <EachTransactionDetails
            visible={isModalVisible}
            record={eachRowData}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <p>No data is available</p>
      )}
    </div>
  );
}
