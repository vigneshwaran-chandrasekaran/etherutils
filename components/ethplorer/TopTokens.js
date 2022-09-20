import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Table } from "@/components/atoms";
import { TopTokenDetailsExpandable, columns } from "@/components/ethplorer";

export default function TopTokens() {
  const [tokensList, setTokensList] = useState([]);
  const [topTokenHolders, seTopTokenHolders] = useState([]);
  const [tokenHistory, setTokenHistory] = useState([]);

  const getTopTokens = useCallback(() => {
    const url = `${process.env.NEXT_PUBLIC_ETHPLORER_API_URL}/getTopTokens?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_IO_API_KEY}`;
    axios.get(url).then((res) => {
      console.log("getTopTokens ", res.data);
      setTokensList(res.data.tokens);
    });
  }, []);

  const getTopTokenHolders = useCallback((address) => {
    const url = `${process.env.NEXT_PUBLIC_ETHPLORER_API_URL}/getTopTokenHolders/${address}?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_IO_API_KEY}`;
    axios.get(url).then((res) => {
      console.log("getTopTokenHolders ", res.data);
      seTopTokenHolders(res.data.holders);
    });
  }, []);

  const getTokenHistoryGrouped = useCallback((address) => {
    const url = `${process.env.NEXT_PUBLIC_ETHPLORER_API_URL}/getTokenHistoryGrouped/${address}?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_IO_API_KEY}`;
    axios.get(url).then((res) => {
      console.log("getTokenHistoryGrouped ", res.data);
      setTokenHistory(res.data.tokens);
    });
  }, []);

  const getTokenPriceHistoryGrouped = useCallback((address) => {
    const url = `${process.env.NEXT_PUBLIC_ETHPLORER_API_URL}/getTokenPriceHistoryGrouped/${address}?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_IO_API_KEY}`;
    axios.get(url).then((res) => {
      console.log("getTokenPriceHistoryGrouped ", res.data);
      setTokenHistory(res.data.tokens);
    });
  }, []);

  useEffect(() => {
    getTopTokens();
  }, [getTopTokens]);

  return (
    <div>
      <h3>50 Top Tokens</h3>
      <Table
        rowKey={(record) => record.symbol + record.address + record.image}
        columns={columns}
        dataSource={tokensList}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <TopTokenDetailsExpandable record={record} />
            </div>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
          onExpand: (expanded, record) => {
            console.log("expanded", expanded);
            console.log("record", record);
            if (expanded) {
              getTopTokenHolders(record.address);
              getTokenHistoryGrouped(record.address);
              getTokenPriceHistoryGrouped(record.address);
            }
          },
        }}
        size="small"
        pagination={{
          pageSize: 25,
          pageSizeOptions: ["10", "25", "50"],
        }}
      />
    </div>
  );
}
