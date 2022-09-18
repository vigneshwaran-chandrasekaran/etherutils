import React from "react";
import { ImageCard } from "@/components/pages/nft";
import { Flex } from "@/components/atoms";

export default function Cards({ data = [] }) {
  return (
    <>
      <Flex flexWrap="wrap" justifyContent="space-between">
        {data?.map((item) => (
          <ImageCard data={item} key={item?.id?.tokenId} />
        ))}
      </Flex>
    </>
  );
}
