import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import moment from "moment";
import { getCryptoCompareUrl } from "@/utils/constants";
import { Flex, Box, Text } from "@/components/atoms";
import { getTime } from "@/utils/time";

export const Cards = styled(Flex)`
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Card = styled(Box)`
  width: 275px;
  margin: 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  a {
    color: #4c4c4c;
  }
`;

export const TextBody = styled(Text)`
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  /* padding: 1rem 0; */
  min-height: 200px;
`;

export default function LatestNews() {
  const [newsData, setNewsData] = useState([]);
  const getLatestNews = useCallback(() => {
    const url = getCryptoCompareUrl("data/v2/news/", {
      lang: "EN",
    });
    console.log("url", url);
    axios.get(url).then((res) => {
      console.log("getPrice ", res.data);
      setNewsData(res.data.Data);
    });
  }, []);

  useEffect(() => {
    getLatestNews();
  }, [getLatestNews]);

  console.log("newsData", newsData);

  return (
    <Cards>
      {newsData.map((item) => (
        <Card key={item?.id}>
          <Link href={item?.url} passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Flex>
                <Image
                  src={item?.imageurl}
                  alt={item?.source}
                  width={128}
                  height={128}
                  style={{ objectFit: "contain" }}
                />
                <Text as="h4" pl="1rem">
                  {item?.title}
                </Text>
              </Flex>
              <TextBody>{item?.body}</TextBody>
              <Text my="0.5rem">{item?.body}</Text>
              <Text fontSize="12px" mt="1rem">
                {getTime(item?.published_on)}
              </Text>
              <Text fontSize="8px">
                {moment(getTime(item?.published_on)).fromNow()}
              </Text>
            </a>
          </Link>
        </Card>
      ))}
    </Cards>
  );
}
