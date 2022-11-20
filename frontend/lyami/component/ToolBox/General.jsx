import React, { useState, useCallback } from "react";
import { HStack, VStack, Image, Text, Pressable, Box, Select, Input, Radio, Switch, Center, Icon } from "native-base";
import { pxToDp, screenHeight, screenWidth } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import { useGlobalStore } from "../../api/Store/globalHook";
import ToolHead from "./ToolHead";
const General = props => {
  const navigation = useNavigation();
  const [currency, setCurrency] = useState("");
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const setSystemSetting = e => {
    setCurrency(e);
    globalData.SystemSetting = { ...globalData.SystemSetting, inuseCurrency: e };
    handleSetGlobalData(globalData);
  };
  useFocusEffect(
    useCallback(() => {
      // console.log(globalData.SystemSetting,"globalData?.SystemSetting?");
      setCurrency(globalData.SystemSetting.inuseCurrency);
      return () => {
        () => {};
      };
    }, [])
  );
  return (
    <VStack w={screenWidth} h={screenHeight} bg="#fff">
      {/* 顶部导航栏 start  */}
      <ToolHead title={I18n.t("setting.general")} type="general"/>
      {/* 顶部导航栏 end  */}
      <Box bg="#EFF2F4" h="100%">
        {/* 别删，后续开发 <VStack w="90%" ml="5%">
            <Text mt={pxToDp(41)} color="#746969" fontWeight="600" fontSize={pxToDp(41)}>
              货币转换
            </Text>
            <Text  color="#746969" fontWeight="600" fontSize={pxToDp(31)}>
              已更新 {moment(new Date()).format("YYYY:MM:DD:HH:mm:ss")}
            </Text>
            <Text  color="#746969" fontWeight="600" fontSize={pxToDp(31)}>
              (中国标准时间)
            </Text>
            <Select
              mt={pxToDp(50)}
              selectedValue={service}
              minWidth="200"
              w="100%"
              h={pxToDp(101)}
              accessibilityLabel="Choose Service"
              placeholder="Choose"
              _selectedItem={{
                bg: "teal.600",
              }}
              onValueChange={itemValue => setService(itemValue) }
            >
              <Select.Item label="USD - United States Dallar" value="USD" />
              <Select.Item label="PAY - TenX" value="PAY" />
            </Select>
          </VStack> */}
        <VStack>
          <Text px={pxToDp(39)} my={pxToDp(29)} color="#746969" fontWeight="600" fontSize={pxToDp(41)}>
            {I18n.t("setting.MainCurrency")}
          </Text>
          <VStack bg="#fff" px={pxToDp(39)}>
            <Text color="#746969" pt={pxToDp(39)} fontWeight="600" fontSize={pxToDp(31)}>
              {I18n.t("setting.PleaseSelectLocal")}
            </Text>
            <Radio.Group
              name="lel"
              value={currency}
              onChange={e => {
                setSystemSetting(e);
              }}
            >
              <HStack w="100%" h={pxToDp(140)} alignItems="center">
                <HStack w="20%">
                  <Radio
                    colorScheme="blue"
                    size="md"
                    value="MATIC"
                    // icon={<Icon w={pxToDp(19)} h={pxToDp(11)} source={Icons.rightArrowIcon} />}
                  ></Radio>
                  <Text> MATIC </Text>
                </HStack>
                <HStack w="20%" ml={pxToDp(22)}>
                  <Radio colorScheme="blue" size="sm" value="LEQ"></Radio>
                  <Text> LEQ</Text>
                </HStack>
              </HStack>
            </Radio.Group>
          </VStack>
        </VStack>
        {/* <VStack w="90%" ml="5%">
          <Text
            mt={pxToDp(40)}
            color="#746969"
            fontWeight="600"
            fontSize={pxToDp(41)}
          >
            {I18n.t("setting.HideCoinNoBalance")}
          </Text>
          <Pressable
            onPress={() => {
              setHideNull(!hideNull);
            }}
            mt={pxToDp(11)}
          >
            <HStack>
              <Image
                key={hideNull}
                w={pxToDp(135)}
                h={pxToDp(69)}
                source={hideNull ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
              ></Image>
              <Text>
                 {hideNull ? I18n.t("setting.On") : I18n.t("setting.Off")}
              </Text>
            </HStack>
          </Pressable>
        </VStack> */}
      </Box>
    </VStack>
  );
};

export default React.memo(General);
