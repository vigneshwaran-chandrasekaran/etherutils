import React from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default function Navbar() {
  return (
    <Menu mode="horizontal" defaultSelectedKeys={["mail"]} className="navbar">
      <Menu.Item key="mail" icon={<MailOutlined />}>
        Logo
      </Menu.Item>
      <Menu.SubMenu key="SubMenu" title="Tools">
        <Menu.Item key="1">Get Balance</Menu.Item>
        <Menu.Item key="2">View Transactions</Menu.Item>
        <Menu.Item key="3">Get Balance</Menu.Item>
        <Menu.Item key="4">View Transactions</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
}
