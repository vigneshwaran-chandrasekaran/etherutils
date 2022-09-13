import React from "react";
import { Modal } from "antd";
import { Text } from "@/components/atoms";

export default function EachTransactionDetails({
  visible = false,
  record = {},
  onCancel,
}) {
  return (
    <Modal
      title={<Text textAlign="center">Transactions</Text>}
      open={visible}
      onCancel={onCancel}
      onOk={onCancel}
      maskClosable={false}
      width="1000px"
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <table>
        <tbody>
          {Object.keys(record).map((key) => (
            <tr key={key}>
              <td>
                <Text
                  fontWeight="bold"
                  pb="1rem"
                  mr="1rem"
                  textTransform="capitalize"
                >
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
        </tbody>
      </table>
    </Modal>
  );
}
