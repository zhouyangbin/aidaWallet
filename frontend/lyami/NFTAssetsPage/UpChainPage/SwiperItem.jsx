import React, { useState } from "react";
import { Avatar, Text, FlatList, HStack, Pressable, VStack, Image } from "native-base";
import Icons from "../../asset/Icon";
import ape from "@/../../assets/image/ape.webp";
const metaTextArray = ["meta1", "meta2", "meta3", "meta4", "meta5", "meta1", "meta2", "meta3", "meta4", "meta5"];
const TabNav = props => {
  const { type, payload, activeIndex, index, setIndex, selected, w } = props;
  return (
    <FlatList
      w={w}
      data={payload}
      horizontal={type == "row"}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            borderRadius="4"
            W="40px"
            py="2"
            key={index}
            bg={index == activeIndex ? "darkBlue.400" : "darkBlue.100"}
            onPress={() => {
              setIndex(index);
            }}
          >
            <Text color="white" textAlign="center">
              {item.type}
            </Text>
          </Pressable>
        );
      }}
    ></FlatList>
  );
};
const MetaItem = props => {
  const { item, index } = props;
  return (
    <HStack alignItems='center' justifyContent='space-between'>
      <Avatar size='8' source={ape}></Avatar>
      <VStack>
        <Text>印记{index}</Text>
        <Text>0x1090....00kd</Text>
      </VStack>
      {/* <Image size="8" source={item?.checked ? Icons.selectedIcon : Icons.notSelectIcon}></Image> */}
      <Image size="6" alt='img' source={Icons.selectedIcon}></Image>
    </HStack>
  );
};
const SwiperItem = props => {
  const { payload } = props;

  const [insetIndex, setInsetIndex] = useState(0);
  const [metaIndex, setMetaIndex] = useState(0);
  //   const [metaArray,setMetaArray] = useState([])

  return (
    <VStack h="100%">
      <HStack w="100%" h="100%">
        <VStack alignItems="center" justifyContent="center" position="relative" w="43%" h="100%" mr='2%'>
          <VStack position="absolute" top="0" left="0" h="120px" w="80px">
            <TabNav type="col" payload={payload.insertArray} activeIndex={insetIndex} setIndex={setInsetIndex}></TabNav>
          </VStack>
          <HStack h="140px" borderRadius="6" w="100%" bg="amber.100" alignItems="center" justifyContent="center" position="relative">
            <VStack alignItems="center">
              <Avatar source={ape} size="20"></Avatar>
              <Text>0x0kfjdsf.....909x</Text>
            </VStack>
            <VStack borderRadius="6" justifyContent="center" alignItems="center" position="absolute" h="100%" w="100%" bg="rgba(0,0,0,0.4)">
              <FlatList
                data={metaTextArray}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <Text key={index} textAlign="center" color="white">
                      {item}
                    </Text>
                  );
                }}
              ></FlatList>
            </VStack>
          </HStack>
        </VStack>
        <VStack w="55%">
          <HStack>
            <TabNav w="70%" type="row" payload={payload.metaArray} activeIndex={metaIndex} setIndex={setMetaIndex}></TabNav>
          </HStack>
          <HStack flex='1'>
            <FlatList
              data={payload.metaArray}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return <MetaItem key={index} index={index} data={item}></MetaItem>;
              }}
            ></FlatList>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default React.memo(SwiperItem);
