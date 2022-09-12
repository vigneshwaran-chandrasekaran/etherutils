import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { message, Table, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ETHER_URL } from "@/utils/constants";
import EachTransactionDetails from "@/components/pages/transactions/EachTransactionDetails";
import { Text } from "@/components/atmos";

console.log("NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);

const queryString = {
  module: "account",
  action: "txlist",
  startblock: 0,
  endblock: 99999999,
  page: 1,
  offset: 10,
  sort: "desc",
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

export default function GetTransactions({ address = "" }) {
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
