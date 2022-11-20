import React, { useMemo, useState } from "react";
import { VStack, Text, Image, FlatList, StatusBar, Pressable, HStack, PresenceTransition } from "native-base";
import Icons from "../../asset/Icon";
import { pxToDp } from "../../../utils/stylesKits";
import Input from "../../component/Input";
import { handleFuzzyQuery } from "../../api/util/helper";

const array = [...new Array(30).keys()];
const areaArray = [];
array.map((item, index) => {
  areaArray.push({ title: `Andorra${index}`, num: index + 376 });
});

const SelectAreaPage = (props) => {
  const { show, close, setAreaCode } = props;
  const [inputValue, setInputValue] = useState();
  const listDataArray = useMemo(() => {
    return handleFuzzyQuery(areaArray, inputValue);
  }, [areaArray, inputValue]);

  return (
    <VStack w="100%" h="100%">
      <PresenceTransition
        visible={show}
        initial={{
          opacity: 0,
          translateY: 20,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: {
            duration: 250,
          },
        }}
      >
        <VStack alignItems="center" h="100%" w="100%">
          {/* <StatusBar bg="transparent" translucent></StatusBar> */}
          <HStack mt={pxToDp(155)} justifyContent="space-between" alignItems="center">
            <Pressable
              onPress={() => {
                close(false);
              }}
              w="30%"
            >
              <Image ml={pxToDp(41)} source={Icons.goBackArrowBIcon} w={pxToDp(70)} h={pxToDp(49)}></Image>
            </Pressable>
            <HStack justifyContent="center" flex="1">
              <Text lineHeight={pxToDp(50)} fontSize={pxToDp(50)} fontWeight="800">
                Aidameta
              </Text>
            </HStack>
            <HStack w="30%"></HStack>
          </HStack>
          <HStack
            mt={pxToDp(61)}
            w={pxToDp(998)}
            h={pxToDp(108)}
            bg="#EDEFF1"
            borderRadius={pxToDp(30)}
            alignItems="center"
          >
            <Input
              InputLeftElement={
                <Pressable
                  h="100%"
                  w={pxToDp(87)}
                  justifyContent="center"
                  onPress={() => setShowPassWord(!showPassWord)}
                >
                  <Image
                    mr={pxToDp(40)}
                    ml={pxToDp(46)}
                    source={Icons.inputSearchIcon}
                    w={pxToDp(44)}
                    h={pxToDp(31.4)}
                  ></Image>
                </Pressable>
              }
              placeholder="Search"
              flex="1"
              borderWidth="0"
              onChangeText={(e) => setInputValue(e)}
            ></Input>
          </HStack>
          <VStack mt={pxToDp(19)} w="100%" flex="1">
            <FlatList
              data={listDataArray}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    flexDirection="row"
                    onPress={() => {
                      setAreaCode(item.num);
                      close(false);
                    }}
                    key={index}
                    alignItems="center"
                    h={pxToDp(100)}
                    justifyContent="space-between"
                  >
                    <HStack alignItems="center" ml={pxToDp(79)}>
                      <Image mr={pxToDp(57)} w={pxToDp(36.7)} h={pxToDp(50.4)} source={Icons.positionIcon}></Image>
                      <Text fontSize={pxToDp(42)}>{item.title}</Text>
                    </HStack>
                    <Text fontSize={pxToDp(36)} color="#575757" mr={pxToDp(79)}>
                      +{item.num}
                    </Text>
                  </Pressable>
                );
              }}
            ></FlatList>
          </VStack>
        </VStack>
      </PresenceTransition>
    </VStack>
  );
};

export default React.memo(SelectAreaPage);
