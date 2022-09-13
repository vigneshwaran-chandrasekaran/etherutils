import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import qs from "qs";
import { ethers } from "ethers";
import moment from "moment";
import { message, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ETHER_URL } from "@/utils/constants";
import { getTime } from "@/utils/time";
import EachTransactionDetails from "@/components/pages/address/EachTransactionDetails";
import { Text, Table } from "@/components/atoms";

const queryString = {
  module: "account",
  action: "txlistinternal",
};
const query = qs.stringify(queryString);
console.log("queryString", query);

export default function InternalTransactions({ hash = "" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [eachRowData, setEachRowData] = useState({});

  function handleViewMore(record) {
    setIsModalVisible(true);
    setEachRowData(record);
  }

  const columns = [
    {
      title: "Block",
      dataIndex: "blockNumber",
      key: "blockNumber",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Age",
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
        <Link href={`/address/${from}`}>
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
        <Link href={`/address/${to}`}>
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
      render: (value) => <span>{ethers.utils.formatEther(value)} Ether</span>,
    },
    {
      title: "Gas",
      dataIndex: "gas",
      key: "gas",
    },
    {
      title: <Text textAlign="center">More Data</Text>,
      dataIndex: "timeStamp",
      key: "timeStamp",
      render: (timeStamp, record) => (
        <Text
          textAlign="center"
          cursor="pointer"
          onClick={() => handleViewMore(record)}
        >
          <EyeOutlined />
        </Text>
      ),
    },
  ];

  function getAddress(hashData) {
    const url = `${ETHER_URL}&txhash=${hashData}&${query}`;
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
    if (hash) {
      getAddress(hash);
    }
  }, [hash]);

  function handleCancel() {
    setIsModalVisible(false);
  }

  return (
    <div>
      {isLoading && <Spin size="large" />}
      {tableData?.length > 0 ? (
        <div>
          <h2>Internal Hash Transactions</h2>
          <Table
            rowKey={(record) =>
              record.blockHash + record.blockNumber + record.hash
            }
            columns={columns}
            dataSource={tableData}
            // scroll={{ x: 1500 }}
            size="small"
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
