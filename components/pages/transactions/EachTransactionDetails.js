import React from "react";
import { Modal } from "antd";
import { Text } from "@/components/atmos";

export default function EachTransactionDetails({
  visible = false,
  record = {},
  onCancel,
}) {
  console.log("record", record);
  console.log("Object keys", Object.keys(record));

  return (
    <Modal
      title={<Text textAlign="center">Transactions</Text>}
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
              <Text fontWeight="bold" pb="1rem" mr="1rem" textTransform="capitalize">
                {key}
              </Text>
            </td>
            <td>
              <Text maxWidth="800px" pb="1rem">
                {record[key]}
              </Text>
            </td>
          </tr>
        ))}
      </table>
    </Modal>
  );
}
