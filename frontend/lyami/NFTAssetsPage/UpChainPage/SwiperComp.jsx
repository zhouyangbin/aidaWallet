import React, { useState } from "react";
import { Box, HStack, Text, VStack } from "native-base";
import Swiper from "react-native-swiper";
import SwiperItem from "./SwiperItem";

const insertArray = [
  { type: "水晶球", list: [1, 2, 3, 4] },
  { type: "地产", list: [5, 6, 7, 8] },
  { type: "游戏1", list: [5, 6, 7, 8] },
  { type: "游戏2", list: [5, 6, 7, 8] },
  { type: "游戏3", list: [5, 6, 7, 8] },
  { type: "游戏4", list: [5, 6, 7, 8] },
  { type: "游戏5", list: [5, 6, 7, 8] },
];
const metaArray = [
  { type: "水晶球", list: [1, 2, 3, 4] },
  { type: "地产", list: [5, 6, 7, 8] },
  { type: "游戏1", list: [5, 6, 7, 8] },
  { type: "游戏2", list: [5, 6, 7, 8] },
  { type: "游戏3", list: [5, 6, 7, 8] },
  { type: "游戏4", list: [5, 6, 7, 8] },
  { type: "游戏5", list: [5, 6, 7, 8] },
  { type: "游戏6", list: [5, 6, 7, 8] },
  { type: "游戏7", list: [5, 6, 7, 8] },
  { type: "游戏8", list: [5, 6, 7, 8] },
  { type: "游戏9", list: [5, 6, 7, 8] },
];

const swiperItemArray = [
  { insertArray, metaArray },
  { insertArray, metaArray },
  { insertArray, metaArray },
  { insertArray, metaArray },
];

const SwiperComp = props => {
  return (
    <VStack h="100%" w="100%">
      <Swiper paginationStyle={{ bottom: 0 }} showsPagination={true} height="100%" width="100%">
        {swiperItemArray.map((item, index) => {
          return <SwiperItem h="100%" payload={item} key={index}></SwiperItem>;
        })}
      </Swiper>
    </VStack>
  );
};

export default React.memo(SwiperComp);
