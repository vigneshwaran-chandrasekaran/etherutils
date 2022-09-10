import React from "react";
import { Modal } from "antd";

export default function EachTransactionDetails({
  visible = false,
  record = {},
  onCancel,
}) {
  console.log("record", record);
  console.log("Object keys", Object.keys(record));

  return (
    <Modal
      title="Transactions"
      visible={visible}
      onOk={onCancel}
      onCancel={onCancel}
      maskClosable={false}
      width="1000px"
    >
      <table>
        {Object.keys(record).map((key) => (
          <tr key={key}>
            <td>
              <strong>{key}</strong>
            </td>{" "}
            <td>{record[key]}</td>
          </tr>
        ))}
      </table>
    </Modal>
  );
}
