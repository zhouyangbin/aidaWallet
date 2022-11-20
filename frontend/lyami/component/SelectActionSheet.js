import React, { useMemo, useState } from "react";
import { Actionsheet, HStack, Image, VStack, Pressable, Text, Box, ScrollView, Input } from "native-base";
import Icons from "../asset/Icon";
import { handleFuzzyQuery } from "@/../../frontend/lyami/api/util/helper";
import { pxToDp } from "../../utils/stylesKits";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";

const NavTab = props => {
  const { payload, activeTab, setActiveTab, showImg, setShowImg } = props;

  return (
    <HStack w={pxToDp(594)} h={pxToDp(84)} bg="#ECEFF5" borderRadius={pxToDp(16)}>
      {payload.map((item, index) => {
        return (
          <Pressable
            onPress={() => {
              setActiveTab(index);
              setShowImg(!showImg);
            }}
            w={pxToDp(297)}
            h="100%"
            key={index}
          >
            <VStack
              borderRadius={pxToDp(16)}
              bg={activeTab == index ? `#5C50D2` : `#ECEFF5`}
              h="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize={pxToDp(36)} color={activeTab == index ? `white` : `#181818`}>
                {item}
              </Text>
            </VStack>
          </Pressable>
        );
      })}
    </HStack>
  );
};

const SearchComp = props => {
  const { onInput } = props;
  return (
    <HStack mt="5" justifyContent="center">
      <Input
        variant="outline"
        w="80%"
        h="10"
        // value={inputValue}
        onChangeText={onInput}
        _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }}
        InputLeftElement={
          <Box ml="2">
            <Image size="2xs" alt="img" source={Icons.inputSearchIcon}></Image>
          </Box>
        }
        placeholder="输入代币名或token进行查询"
      />
    </HStack>
  );
};

const SelectActionSheet = props => {
  const { handleSelect, selectItemArray, type, tabs, isOpen, close } = props;
  const [selectedIndex, setSelectIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue, setSearchValue] = useState(null);
  const [showImg, setShowImg] = useState(true);
  const payloadArray = useMemo(() => {
    if (type == "double") {
      let array = [selectItemArray[0], selectItemArray[1]];
      return handleFuzzyQuery(array[activeTab], searchValue);
    } else {
      return handleFuzzyQuery(selectItemArray, searchValue);
    }
  }, [selectItemArray, activeTab, searchValue]);

  const handleChangeInput = payload => {
    setSearchValue(payload);
    // console.log(payload);
  };
  return (
    <>
      <Actionsheet
        isOpen={isOpen}
        onClose={() => {
          close(false);
        }}
      >
        <Actionsheet.Content>
          {type == "double" ? (
            <VStack alignItems="center" justifyContent="center">
              <NavTab
                setShowImg={setShowImg}
                showImg={showImg}
                setSelectIndex={setSelectIndex}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                payload={tabs}
              ></NavTab>
              {activeTab == 0 ? <SearchComp onInput={handleChangeInput}></SearchComp> : null}
            </VStack>
          ) : null}
          <ScrollView w="100%">
            {payloadArray?.map((item, index) => {
              return (
                <Actionsheet.Item
                  key={index}
                  w="100%"
                  borderBottomWidth={index != payloadArray?.length - 1 ? "1" : 0}
                  borderColor="rgba(212,212,212,1.0)"
                  onPress={() => {
                    handleSelect({ item, index });
                    setSelectIndex(index);
                    setShowImg(true);
                    close(false);
                  }}
                >
                  <HStack w="100%" alignItems="center">
                    <HStack alignItems="center" w="93%">
                      <CrystalBallComponent
                        type="primary"
                        width={pxToDp(85.1)}
                        height={pxToDp(85.1)}
                        gene={item.account?.address.slice(2, 38)}
                      ></CrystalBallComponent>
                      <HStack paddingRight="4" alignItems="center" flex="1" justifyContent="space-between">
                        <Text fontSize={pxToDp(36)}> {item.title}</Text>
                        <VStack>
                          <Text fontSize={pxToDp(36)}>
                            {item.count}
                            <Text> {item.symbol}</Text>
                          </Text>
                        </VStack>
                      </HStack>
                    </HStack>
                    <HStack alignItems="center" w="10%">
                      {selectedIndex == index && showImg ? (
                        <Image alt="img" size="4" source={Icons.correctIcon}></Image>
                      ) : null}
                    </HStack>
                  </HStack>
                </Actionsheet.Item>
              );
            })}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default React.memo(SelectActionSheet);
