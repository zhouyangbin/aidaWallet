import React from "react";
import { Text, Center, HStack, Pressable } from "native-base";
import { screenWidth, pxToDp } from "../../../utils/stylesKits";

const Tabs = (props) => {
  const { tabIndex, setTabIndex, handleSetTab, tabs, w = 998, mt } = props;
  return (
    <HStack
      mt={pxToDp(mt ? mt : 49)}
      alignItems="center"
      justifyContent="space-between"
      bg="#fff"
      w={pxToDp(w)}
      borderRadius={pxToDp(16)}
    >
      {tabs.map((item, index) => {
        return (
          <Pressable
            key={index}
            w="50%"
            borderRadius={pxToDp(16)}
            bg={index == tabIndex ? "#5C50D2" : null}
            onPress={() => {
              setTabIndex(index);
            }}
          >
            <Text
              h={pxToDp(81)}
              lineHeight={pxToDp(81)}
              textAlign="center"
              color={index == tabIndex ? "#fff" : "#5C50D2"}
              fontSize={pxToDp(36)}
              fontWeight={index == tabIndex ? "800" : "500"}
            >
              {item}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  );

  
};

export default React.memo(Tabs);
