import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { Text, Table, Box } from "@/components/atoms";
import moment from "moment";
import { getTime } from "@/utils/time";
import { EthDailyPriceChart } from "@/components/ethereumdb";

const columns = [
  {
    title: "open",
    dataIndex: "open",
    key: "open",
    render: (open) => <span>{open}</span>,
  },

  {
    title: "high",
    dataIndex: "high",
    key: "high",
    render: (high) => <span>{high}</span>,
  },

  {
    title: "low",
    dataIndex: "low",
    key: "low",
    render: (low) => <span>{low}</span>,
  },

  {
    title: "close",
    dataIndex: "close",
    key: "close",
    render: (close) => <span>{close}</span>,
  },
  {
    title: "Date",
    dataIndex: "timestamp",
    key: "timestamp",
    render: (timestamp) => (
      <Box>
        <Text>{moment(getTime(timestamp)).format("DD-MM-YYYY")}</Text>
        <Text fontSize="8px">{moment(getTime(timestamp)).fromNow()}</Text>
      </Box>
    ),
  },
];

const TODAY = moment().format("YYYY-MM-DD");
const ONE_MONTH_BEFORE = moment().subtract(1, "months").format("YYYY-MM-DD");

export default function EthDailyPrice() {
  const [historyData, setHistoryData] = useState([]);
  const getPrice = useCallback(() => {
    const url = `https://api.ethereumdb.com/v1/timeseries/history?pair=ETH-USD&from=${ONE_MONTH_BEFORE}&to=${TODAY}`;
    // const url =
    //   "https://api.ethereumdb.com/v1/timeseries?pair=ETH-USD&range=1y&type=line";
    axios.get(url).then((res) => {
      console.log("getPrice ", res.data);
      setHistoryData(res.data.reverse());
    });
  }, []);

  useEffect(() => {
    getPrice();
  }, [getPrice]);

  return (
    <div>
      <EthDailyPriceChart
        values={historyData?.map((item) => item.open)}
        labels={historyData?.map((item) =>
          moment(getTime(item.timestamp)).format("DD MMM YYYY")
        )}
      />
      <Table
        rowKey={(record) => record.open + record.timestamp}
        columns={columns}
        dataSource={historyData}
        size="small"
      />
    </div>
  );
}
