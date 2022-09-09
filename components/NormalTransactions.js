import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { Input, Button, Spin, message, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ETHER_URL, SAMPLE_SINGLE_ADDREESS } from "@/utils/constants";

console.log("NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);

const queryString = {
  module: "account",
  action: "txlist",
  startblock: 0,
  endblock: 99999999,
  page: 1,
  offset: 10,
  sort: "asc",
};
const query = qs.stringify(queryString);
console.log("queryString", query);

function getTime(timeStamp_value) {
  const theDate = new Date(timeStamp_value * 1000);
  return theDate.toGMTString();
}

const columns = [
  {
    title: "Block Number",
    dataIndex: "blockNumber",
    key: "blockNumber",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "TimeStamp",
    dataIndex: "timeStamp",
    key: "timeStamp",
    render: (timeStamp) => <a>{getTime(timeStamp)}</a>,
  },
  // {
  //   title: "Hash",
  //   dataIndex: "hash",
  //   key: "hash",
  // },
  // {
  //   title: "nonce",
  //   dataIndex: "nonce",
  //   key: "nonce",
  // },
  // {
  //   title: "blockHash",
  //   dataIndex: "blockHash",
  //   key: "blockHash",
  // },
  // {
  //   title: "transactionIndex",
  //   dataIndex: "transactionIndex",
  //   key: "transactionIndex",
  // },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
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
  // {
  //   title: "isError",
  //   dataIndex: "isError",
  //   key: "isError",
  // },
  // {
  //   title: "txreceipt_status",
  //   dataIndex: "txreceipt_status",
  //   key: "txreceipt_status",
  // },
  // {
  //   title: "input",
  //   dataIndex: "input",
  //   key: "input",
  // },
  // {
  //   title: "cumulativeGasUsed",
  //   dataIndex: "cumulativeGasUsed",
  //   key: "cumulativeGasUsed",
  // },
  // {
  //   title: "gasUsed",
  //   dataIndex: "gasUsed",
  //   key: "gasUsed",
  // },
  {
    title: "contractAddress",
    dataIndex: "contractAddress",
    key: "contractAddress",
  },
  // {
  //   title: "confirmations",
  //   dataIndex: "confirmations",
  //   key: "confirmations",
  // },
  // {
  //   title: "methodId",
  //   dataIndex: "methodId",
  //   key: "methodId",
  // },
  // {
  //   title: "functionName",
  //   dataIndex: "functionName",
  //   key: "functionName",
  // },
  {
    title: "More Data",
    dataIndex: "timeStamp",
    key: "timeStamp",
    render: (timeStamp) => (
      <a>
        <EyeOutlined />
      </a>
    ),
  },
];

export default function NormalTransactions() {
  const [addressData, setAddressData] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  function getAddress() {
    const url = `${ETHER_URL}&address=${addressData}&${query}`;
    console.log("url", url);
    setIsLoading(true);

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.result);
        setTableData(response.data.result);
      })
      .catch((e) => {
        console.log("e", e);
        message.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <p>{SAMPLE_SINGLE_ADDREESS}</p>
      {isLoading ? <Spin size="large" /> : <p>{ethBalance}</p>}
      <Input
        placeholder="Address"
        onChange={(e) => setAddressData(e.target.value)}
      />
      <Button type="primary" onClick={getAddress}>
        Get Transactions
      </Button>
      <Table
        rowKey={(record) => record.blockHash + record.blockNumber + record.hash}
        columns={columns}
        dataSource={tableData}
        scroll={{ x: 2500 }}
        size="small"
      />
    </div>
  );
}
