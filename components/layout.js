import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Navbar from "./navbar";
import Footer from "./footer";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const onClick = (e) => {
  console.log("click", e);
};

const items = [
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem(
      "Item 1",
      null,
      null,
      [getItem("Option 1", "1"), getItem("Option 2", "2")],
      "group"
    ),
    getItem(
      "Item 2",
      null,
      null,
      [getItem("Option 3", "3"), getItem("Option 4", "4")],
      "group"
    ),
  ]),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="content-area flex-start">
        <Menu
          onClick={onClick}
          style={{
            width: 256,
          }}
          mode="vertical"
          items={items}
        />
        <main className="main">{children}</main>
      </div>
      <Footer />
    </>
  );
}
