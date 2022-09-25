import React, { useState, useCallback, useEffect } from "react";
import { getCryptoCompareUrl } from "@/utils/constants";
import axios from "axios";

export default function LatestNews() {
  const [newsData, setNewsData] = useState([]);
  const getLatestNews = useCallback(() => {
    const url = getCryptoCompareUrl("data/v2/news/", {
      lang: "EN",
    });
    console.log('url', url);
    axios.get(url).then((res) => {
      console.log("getPrice ", res.data);
      setNewsData(res.data.Data);
    });
  }, []);

  useEffect(() => {
    getLatestNews();
  }, [getLatestNews]);

  console.log('newsData', newsData);

  return <div>LatestNews</div>;
}
