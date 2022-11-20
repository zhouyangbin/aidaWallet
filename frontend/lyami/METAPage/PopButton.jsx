import React from "react";
import {VStack,Image } from "native-base";
import ActionButton from "react-native-action-button";
import Icons from "../asset/Icon";
import { pxToDp } from "../../utils/stylesKits";
const PopButton = props => {
  const { showAddCrystalballDialog } = props;
  return (
    <ActionButton
      position="right"
      size={pxToDp(94)}
      style={{ zIndex: 101 }}
      onPress={e => {
        console.log(e);
      }}
      degrees={0}
      offsetY={pxToDp(101)}
      offsetX={pxToDp(50)}
      hideShadow={true}
      spacing={7}
      renderIcon={active => {
        return active ? (
          <VStack
            w={pxToDp(94)}
            h={pxToDp(94)}
            justifyItems="center"
            alignItems="center"
            bg="rgba(31, 47, 101, 0.9)"
            borderRadius={pxToDp(94)}
          >
            <Image alt="img" key={1} w={pxToDp(94)} h={pxToDp(94)} source={Icons.newUnFoldIcon} />
          </VStack>
        ) : (
          <VStack
            w={pxToDp(94)}
            h={pxToDp(94)}
            justifyItems="center"
            alignItems="center"
            bg="rgba(31, 47, 101, 0.9)"
            borderRadius={pxToDp(94)}
          >
            <Image key={2} alt="img" w={pxToDp(94)} h={pxToDp(94)} source={Icons.newFoldIcon} />
          </VStack>
        );
      }}
      buttonColor="rgba(255,255,255,0)"
    >
      {/* <ActionButton.Item buttonColor="rgba(31, 47, 101, 0.8)" onPress={() => searchNFT()}>
                <Image alt="img" w={pxToDp(94)} h={pxToDp(94)} source={Icons.newSearchIcon} />
              </ActionButton.Item> */}
      <ActionButton.Item buttonColor="rgba(31, 47, 101, 0.9)" onPress={() => showAddCrystalballDialog()}>
        <Image alt="img" w={pxToDp(94)} h={pxToDp(94)} source={Icons.newAddIcon} />
      </ActionButton.Item>
      {/* <ActionButton.Item
                buttonColor="rgba(31, 47, 101, 0.7)"
                onPress={() => navigation.navigate("ShelvesPage", {})}
              >
                <Image alt="img" w={pxToDp(94)} h={pxToDp(94)} source={Icons.newBreedIcon} />
              </ActionButton.Item> */}
      {/* <ActionButton.Item buttonColor="rgba(31, 47, 101, 0.8)" onPress={() => navigation.navigate("Cart", {})}>
                <Image alt="img" w={pxToDp(94)} h={pxToDp(94)} source={Icons.newTrendIcon} />
              </ActionButton.Item> */}
      {/* <ActionButton.Item buttonColor="rgba(31, 47, 101, 0.8)" onPress={() => navigation.navigate("TrendPage", {})}>
                <Image alt="img" w={pxToDp(94)} h={pxToDp(94)} source={Icons.newMarketIcon} />
              </ActionButton.Item> */}
    </ActionButton>
  );
};

export default React.memo(PopButton);
