import React, { useState, useEffect } from "react";
import { HStack, Pressable, Text, PresenceTransition, Image } from "native-base";
import { pxToDp } from "../../utils/stylesKits";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { Linking, Alert } from "react-native";
import Icons from "../asset/Icon";
import { cloneDeep } from "lodash";
import { I18n } from "../../language/I18n";
const sleep = async timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const openLink = async () => {
  try {
    const url = "https://opensea.io/collection/aidameta";
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        // dismissButtonStyle: "cancel",
        // preferredBarTintColor: "#453AA4",
        // preferredControlTintColor: "white",
        // readerMode: false,
        // animated: true,
        // modalPresentationStyle: "fullScreen",
        // modalTransitionStyle: "coverVertical",
        // modalEnabled: true,
        // enableBarCollapsing: false,
        // Android Properties
        showTitle: false,
        toolbarColor: "#5C50D2",
        secondaryToolbarColor: "black",
        navigationBarColor: "black",
        navigationBarDividerColor: "white",
        enableUrlBarHiding: false,
        enableDefaultShare: false,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: "slide_in_right",
          startExit: "slide_out_left",
          endEnter: "slide_in_left",
          endExit: "slide_out_right",
        },
        headers: {
          Browser: "Browser",
        },
      });
      await sleep(800);
      //   Alert.alert(JSON.stringify(result));
    } else Linking.openURL(url);
  } catch (error) {
    Alert.alert(error.message);
  }
};
const BottomTab = props => {
  const TabArray = [
    {
      title: I18n.t("bottomNav.assets"),
      url: "WalletMainNew",
      isSelect: true,
      src: Icons.assetsIcon,
      srcC: Icons.assetsCIcon,
    },
    {
      title: I18n.t("bottomNav.browser"),
      url: "Browser",
      isSelect: false,
      src: Icons.browserIcon,
      srcC: Icons.browserCIcon,
    },
    {
      title: I18n.t("bottomNav.space"),
      url: "METASpace",
      isSelect: false,
      src: Icons.spaceIcon,
      srcC: Icons.spaceCIcon,
    },
    {
      title: I18n.t("bottomNav.market"),
      url: "ShoppingMall",
      isSelect: false,
      src: Icons.marketNavIcon,
      srcC: Icons.marketNavCIcon,
    },
    { title: I18n.t("bottomNav.my"), url: "MineSpace", isSelect: false, src: Icons.myIcon, srcC: Icons.myCIcon },
  ];
  const { menuShow, menuSelect } = props;
  const navigation = useNavigation();
  const [tabArray, setTabArray] = useState(TabArray);
  useEffect(() => {
    // console.log(menuSelect,"menuSelect");
    setTabArray(state => {
      const newData = cloneDeep(state);
      newData.map(item => (item.isSelect = false));
      newData[menuSelect].isSelect = true;
      // console.log(newData,menuSelect);
      return newData;
    });
  }, [menuSelect]);
  return (
    <HStack position="absolute" bottom="0" zIndex={999} w="100%">
      <PresenceTransition
        visible={menuShow}
        initial={{
          opacity: 0,
          translateY: 30,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: {
            duration: 50,
          },
        }}
      >
        <HStack bg="white" shadow={8}>
          {tabArray.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  setTabArray(state => {
                    const array = cloneDeep(state);
                    if (index != 1) {
                      array.map((item, index) => {
                        item.isSelect = false;
                      });
                      array[index].isSelect = true;
                      return array;
                    }
                    return array;
                  });
                  if (item.url == "Browser") {
                    return openLink();
                  }
                  navigation.navigate(item.url, {});
                }}
                w="20%"
                h={pxToDp(201)}
                // justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <Image
                  w={index !== 2 ? pxToDp(63) : pxToDp(167)}
                  h={index !== 2 ? pxToDp(57) : pxToDp(81)}
                  alt="image"
                  key={item.isSelect}
                  source={item.isSelect ? item.srcC : item.src}
                  mb={pxToDp(17)}
                  mt={pxToDp(33)}
                  resizeMode="stretch"
                ></Image>
                {index != 2 && (
                  <Text fontSize={pxToDp(28)} color={item.isSelect ? "#6E5FFF" : "#181818"} w="100%" textAlign="center">
                    {item.title}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </HStack>
      </PresenceTransition>
    </HStack>
  );
};

export default React.memo(BottomTab);
