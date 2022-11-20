import React from "react";
import { HStack, Pressable, Text, } from "native-base";
import { pxToDp,  } from "../../utils/stylesKits";



const Tabs = (props) => {
  const {tabs, tabIndex, handleSetTab} = props
  return (
    <HStack mt={pxToDp(49)} alignItems="center" justifyContent="space-between" bg="#fff" w={pxToDp(998)} borderRadius={pxToDp(16)}>
      {tabs.map((item, index) => {
        return (
          <Pressable
            key={index}
            w={100 / tabs.length + "%"}
            borderRadius={pxToDp(16)}
            bg={item.key == tabIndex ? "#5C50D2" : null}
            onPress={() => {
              handleSetTab(item.key);
            }}
          >
            <Text h={pxToDp(84)} lineHeight={pxToDp(84)} textAlign="center" color={item.key == tabIndex ? "#fff" : "#5C50D2"} fontSize={pxToDp(36)} fontWeight="800">
              {item.text}
            </Text>
          </Pressable>
        );
      })}

    </HStack>
  );
};

export default React.memo(Tabs);
