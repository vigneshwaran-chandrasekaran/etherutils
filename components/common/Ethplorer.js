import React, { useEffect, useCallback } from "react";
import axios from "axios";

export default function Ethplorer() {
  const getLastBlock = useCallback(() => {
    const url = `${process.env.NEXT_PUBLIC_ETHPLORER_API_URL}/getTokenInfo/0xf3db5fa2c66b7af3eb0c0b782510816cbe4813b8?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_IO_API_KEY}`;
    axios.get(url).then((res) => {
      console.log("res", res);
    });
  }, []);



  useEffect(() => {
    getLastBlock();
  }, [getLastBlock]);

  return <div>Ethplorer</div>;
}
