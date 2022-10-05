import React from "react";
import { Table } from "antd";

const dataSource = [
  {
    key: "1",
    name: "etherscan",
    website: ["https://etherscan.io/"],
    apiLink: ["https://docs.etherscan.io/"],
  },
  {
    key: "2",
    name: "infura",
    website: ["https://infura.io/"],
    apiLink: ["https://docs.infura.io/infura/getting-started"],
  },
  {
    key: "3",
    name: "Ethplorer",
    website: ["https://ethplorer.io/"],
    apiLink: ["https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API"],
  },
  {
    key: "4",
    name: "Ethplorer",
    website: ["https://www.alchemy.com/"],
    apiLink: [
      "https://docs.alchemy.com/",
      "https://docs.alchemy.com/reference/api-overview",
    ],
  },
  {
    key: "5",
    name: "cryptocompare",
    website: ["https://www.cryptocompare.com/"],
    apiLink: ["https://min-api.cryptocompare.com/"],
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
    render: (website) => (
      <>
        {website?.map((item, i) => (
          <div key={i}>
            <a href={item} target="_blank" rel="noreferrer">
              {item}
            </a>
          </div>
        ))}
      </>
    ),
  },
  {
    title: "Link",
    dataIndex: "apiLink",
    key: "apiLink",
    render: (apiLink) => (
      <>
        {apiLink?.map((item, i) => (
          <div key={i}>
            <a href={item} target="_blank" rel="noreferrer">
              {item}
            </a>
          </div>
        ))}
      </>
    ),
  },
];

export default function OpenApi() {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}
