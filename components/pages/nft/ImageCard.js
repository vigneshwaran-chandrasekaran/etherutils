/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import { Flex, Text } from "@/components/atoms";

export const Card = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 8%) 0px 4px 15px;
  transition: box-shadow 0.25s ease-in-out 0s;
  border-radius: 10px;
  width: 300px;
  margin-bottom: 3em;
`;

export const Img = styled.img`
  display: inline-block;
  object-fit: cover;
  margin-top: 1.5rem;
`;

export const Title = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  min-height: 100px;
  padding: 1rem 1rem;
`;

export default function ImageCard({ data }) {
  return (
    <Card>
      <Img src={data?.media?.[0]?.gateway} alt={data?.title} width={256} />
      <div>
        <Title>{data?.title}</Title>
      </div>
    </Card>
  );
}
