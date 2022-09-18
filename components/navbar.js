import React from "react";
import Link from "next/link";
import { Menu, Col, Row } from "antd";
import Image from "next/image";
import styled from "styled-components";

export const MyMenu = styled(Menu)`
  .ant-menu-title-content {
    font-size: 16px;
    font-weight: 600;
    color: #04111d;
    height: 75px;
    line-height: 75px;
    display: inline-block;
  }
`;

const items = [
  {
    label: (
      <Link href="/nft/owner/0x1Ccbc06Cf780E9aB8fB51113fed727C9f240De40">
        <a>NFT</a>
      </Link>
    ),
    key: "6",
  },
  { label: "Get Balance", key: "1" },
  { label: "View Transactions", key: "2" },
  {
    label: (
      <Link href="/ethers/address/0x00000000219ab540356cbb839cbe05303d7705fa">
        <a>Ethers</a>
      </Link>
    ),
    key: "5",
  },

  {
    label: "Tools",
    key: "submenu",
    children: [
      { label: "Get Balance", key: "3" },
      { label: "View Transactions", key: "4" },
    ],
  },
];

export default function Navbar() {
  return (
    <Row className="navbar-row">
      <Col span={2} />
      <Col span={2}>
        <Link href="/">
          <a className="menu-logo">
            <Image
              src="/ethereum.svg"
              alt="India Flag"
              width={36}
              height={36}
            />
            <span className="app-name">Ether Utils</span>
          </a>
        </Link>
      </Col>
      <Col span={10} />
      <Col span={10}>
        <MyMenu mode="horizontal" items={items} />
      </Col>
    </Row>
  );
}
