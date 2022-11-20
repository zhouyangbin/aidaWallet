import React from "react";
import {
  HStack,
  VStack,
  Text,
  PresenceTransition,
  Image,
  FlatList,
  Select,
  Input,
} from "native-base";
import { pxToDp } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useState } from "react";
import { ImageBackground } from "react-native";
import shadowCon from "@/../../assets/image/UiImg//shadowCon.webp";

const composeData = [...new Array(10).keys()];

const GameCompItem = (payload) => {
  const { data, index } = payload;
  return (
    <HStack alignItems="center" w="100%" mb="2">
      <Text ml="1">Meta{index}</Text>
      {/* <Avatar ml="2" source={null} size="10"></Avatar> */}
      <Text ml="2" fontSize="10">
        {new Date().getTime()}{" "}
      </Text>
    </HStack>
  );
};
const GameComp = (props) => {
  const { payload } = props;
  const [filterValue, setFilterValue] = useState(0);
  return (
    <HStack w="100%">
      <PresenceTransition
        style={{ width: "100%" }}
        visible={true}
        initial={{
          opacity: 0,
          translateX: 10,
        }}
        animate={{
          opacity: 1,
          translateX: 0,
          transition: {
            duration: 150,
          },
        }}
      >
        <VStack w="100%">
          <HStack ml={pxToDp(38)} alignItems="center">
            <HStack mr={pxToDp(44)} alignItems="center">
              <Text mr={pxToDp(25)}>Filter</Text>
              <Select
                w={pxToDp(376.5)}
                h={pxToDp(69)}
                bg="white"
                borderRadius={pxToDp(34.5)}
                borderWidth="0"
                placeholder=""
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: (
                    <Image
                      w={pxToDp(27)}
                      h={pxToDp(17.8)}
                      source={Icons.seDownArrowIcon}
                    ></Image>
                  ),
                }}
                onValueChange={(itemValue) => setFilterValue(itemValue)}
                value={filterValue}
              >
                {composeData.map((item, index) => {
                  return (
                    <Select.Item
                      label={"游戏" + item}
                      key={index}
                      value={index}
                    ></Select.Item>
                  );
                })}
              </Select>
            </HStack>
            <Input
              bg="white"
              w={pxToDp(376, 5)}
              h={pxToDp(69)}
              py={pxToDp(7)}
              borderRadius={pxToDp(34.5)}
              borderWidth="0"
              placeholder="Search"
              InputLeftElement={
                <Image
                  ml={pxToDp(23)}
                  w={pxToDp(29.1)}
                  h={pxToDp(29.1)}
                  source={Icons.inputSearchIcon}
                ></Image>
              }
            ></Input>
          </HStack>
          <HStack>
            <ImageBackground
              source={shadowCon}
              style={{
                width: pxToDp(998),
                height: pxToDp(654.5),
                paddingBottom: pxToDp(80),
                paddingTop: pxToDp(40),
                paddingLeft: pxToDp(40),
              }}
              resizeMode="stretch"
            >
              <FlatList
                data={composeData}
                renderItem={({ item, index }) => {
                  return (
                    <GameCompItem
                      key={index}
                      index={index}
                      data={item}
                    ></GameCompItem>
                  );
                }}
              ></FlatList>
            </ImageBackground>
          </HStack>
        </VStack>
      </PresenceTransition>
    </HStack>
  );
};
export default React.memo(GameComp);
