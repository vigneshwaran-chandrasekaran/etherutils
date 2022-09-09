import React from "react";
import Link from "next/link";
import { Menu, Col, Row } from "antd";
import Image from "next/image";

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
            <span>Ether Utils</span>
          </a>
        </Link>
      </Col>
      <Col span={14} />
      <Col span={6}>
        <Menu mode="horizontal">
          <Menu.SubMenu key="SubMenu" title="Tools">
            <Menu.Item key="1">Get Balance</Menu.Item>
            <Menu.Item key="2">View Transactions</Menu.Item>
            <Menu.Item key="3">Get Balance</Menu.Item>
            <Menu.Item key="4">View Transactions</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Col>
    </Row>
  );
}
