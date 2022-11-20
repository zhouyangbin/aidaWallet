import React, { useState } from "react";
import {
  HStack,
  VStack,
  Image,
  Text,
  Pressable,
  Box,
  Select,
  Input,
  Radio,
  Switch,
  ScrollView,
  View,
  useToast,
} from "native-base";
import Button from "../Button";
import { pxToDp, screenHeight, screenWidth } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import { StyleSheet } from "react-native";
import global from "../../api/util/global";
import RNFS from "react-native-fs";
import moment from "moment";
import { SaveGlobalData } from "../../api/localStorge/LocalStroge";
import ToolHead from "./ToolHead";
const Advanced = props => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const [netType, setNetType] = useState("Ledger");
  const [hideNull, setHideNull] = useState(false);
  const toast = useToast();
  const handleSetInput = text => {
    setSearchValue(text);
  };
  //重置账户
  const DownloadLog = () => {
    try {
      const text = JSON.stringify(global.Records);
      const date = moment(new Date()).format("YYYY年MM月DD日HH时mm分ss");
      const fileName = "/" + date + "状态日志" + ".json";
      RNFS.writeFile(RNFS.DocumentDirectoryPath + fileName, text, "utf8")
        .then(success => {
          toast.show({
            description: "Download success",
            placement: "top",
            duration: 1500,
          });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const ResetAccount = () => {
    // console.log(global.keys);
    if (global.keys.length > 1) {
      const current = global.keys.findIndex(item => item.address == global.defaultKey.address);
      global.keys.splice(current, 1);
      SaveGlobalData(global.CreateNewPassword);

      navigation.push("lyamiLogin");
    } else {
      toast.show({
        description: "当前只有一个账户，不能删除",
        placement: "top",
        duration: 1500,
      });
    }
  };
  return (
    <View w={screenWidth} h={screenHeight} bg="#fff">
      <ToolHead title={I18n.t("setting.advanced")} type="advanced"/>
      <HStack
        px={pxToDp(41)}
        style={[styles.listBox]}
        alignItems="center"
        h={pxToDp(94)}
        borderRadius={pxToDp(47)}
      >
        <Input
          variant="outline"
          type="text"
          w="100%"
          h={pxToDp(108)}
          fontSize={pxToDp(38)}
          fontWeight="500"
          color="#9FA1A8"
          borderWidth={0}
          backgroundColor="#EFF2F4"
          borderRadius={pxToDp(21)}
          value={searchValue}
          placeholder="Search in Settings"
          _focus={{ borderColor: "#bbc0c5", backgroundColor: "#efefef" }}
          onChangeText={handleSetInput}
          InputLeftElement={
            <Image alt="image" source={Icons.inputSearchIcon} w={pxToDp(50)} h={pxToDp(42)} marginLeft="3" />
          }
        />
      </HStack>
      <ScrollView mt={pxToDp(41)} h="82%" bg="#EFF2F4">
        <VStack style={[styles.listBox]}>
          <Text my={pxToDp(22)} px={pxToDp(41)} style={[styles.listText1]}>
            {I18n.t("setting.StatusLog")}
          </Text>
          <VStack bg="#fff" px={pxToDp(41)} py={pxToDp(31)}>
            <Text style={[styles.listText2]} pb={pxToDp(41)}>
              {I18n.t("setting.StatusTips")}
            </Text>
            <VStack alignItems="center">
              <Button style={[styles.buttonBlue]} onPress={() => DownloadLog()}>
                {I18n.t("setting.DownloadStatusLog")}
              </Button>
            </VStack>
          </VStack>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} my={pxToDp(22)} px={pxToDp(41)} color="#746969" fontWeight="600" fontSize={pxToDp(41)}>
            {I18n.t("setting.SynsUsingMobileDevice")}
          </Text>
          <VStack bg="#fff" py={pxToDp(31)} alignItems="center">
            <Button style={[styles.buttonBlue]}>{I18n.t("setting.SynsUsingMobileDevice")}</Button>
          </VStack>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text my={pxToDp(22)} px={pxToDp(41)} style={[styles.listText1]}>
            {I18n.t("setting.ResetAccount")}
          </Text>
          <VStack bg="#fff" px={pxToDp(41)} py={pxToDp(31)}>
            <Text style={[styles.listText2]} pb={pxToDp(41)}>
              {I18n.t("setting.ResetAccountTips")}
            </Text>
            <VStack alignItems="center">
              <Button {...styles.buttonRed} onPress={() => ResetAccount()}>
                {I18n.t("setting.ResetAccount")}
              </Button>
            </VStack>
          </VStack>
        </VStack>
        {/* <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            {I18n.t("setting.HideCoinNoBalance")}
          </Text>
          <Text style={[styles.listText2]}>
            重置账户将清除您的交易历史记录。这不会改变您账户中的余额，也不会要求您重新输入账户助记词。
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
              <Text>{hideNull ? "开" : "关"}</Text>
            </HStack>
          </Pressable>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            高级燃料控制
          </Text>
          <Text style={[styles.listText2]}>
            在发送和确认界面显示燃料价格和燃料限制设置选项。
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
              <Text>{hideNull ? "开" : "关"}</Text>
            </HStack>
          </Pressable>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText2]}>
            Enhanced token detection ConsenSys' token API aggregates a list of
            tokens from various third party token lists. When turned on, tokens
            will be automatically detected, and searchable, on Ethereum mainnet,
            Binance, Polygon and Avalanche. When turned off, automatic detection
            and search can only be done on Ethereum mainnet.
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
              <Text>{hideNull ? "开" : "关"}</Text>
            </HStack>
          </Pressable>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            显示十六进制数据
          </Text>
          <Text style={[styles.listText2]}>
            请选择该选项，在发送页面显示十六进制数据字域
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
              <Text>{hideNull ? "开" : "关"}</Text>
            </HStack>
          </Pressable>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            显示测试网络
          </Text>
          <Text style={[styles.listText2]}>
            选择此项以在网络列表中显示测试网络
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
              <Text>{hideNull ? "开" : "关"}</Text>
            </HStack>
          </Pressable>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            自定义交易 nonce
          </Text>
          <Text style={[styles.listText2]}>
            开启此功能可以改变确认屏幕上的
            nonce（交易号）。此为高级功能，请谨慎使用。
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
              <Text>{hideNull ? "开" : "关"}</Text>
            </HStack>
          </Pressable>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            自动锁定定时（分钟）
          </Text>
          <Text style={[styles.listText2]}>
            请设置 MetaMask 自动锁定前的空闲时间（单位：分钟）
          </Text>
          <HStack mt={pxToDp(31)} w="100%" h={pxToDp(140)} alignItems="center">
            <Input
              variant="outline"
              type="text"
              w="100%"
              h={pxToDp(108)}
              fontSize={pxToDp(38)}
              fontWeight="500"
              color="#9FA1A8"
              borderColor="#bbc0c5"
              borderWidth={pxToDp(2)}
              backgroundColor="#EDEFF1"
              borderRadius={pxToDp(21)}
              value={searchValue}
              placeholder="Please input"
              _focus={{ borderColor: "#bbc0c5", backgroundColor: "#efefef" }}
              onChangeText={handleSetInput}
            />
          </HStack>
          <HStack mt={pxToDp(23)} w="100%" alignItems="center">
            <Button w={pxToDp(170)} borderRadius={pxToDp(80)} h={pxToDp(61)}>
              保存
            </Button>
          </HStack>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            Backup your data
          </Text>
          <Text style={[styles.listText2]}>
            Backup your data You can backup user settings containing preferences
            and account addresses into a JSON file.
          </Text>
          <Button
            w="100%"
            mt={pxToDp(31)}
            mb={pxToDp(31)}
            h={pxToDp(109)}
            borderRadius={pxToDp(132)}
            bg="#fff"
            color="#0391e2"
            borderColor="#0391e2"
            borderWidth={pxToDp(2)}
          >
            backup
          </Button>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            Restore user data
          </Text>
          <Text style={[styles.listText2]}>
            You can restore user settings containing preferences and account
            addresses from a previously backed up JSON file.
          </Text>
          <Button
            w="100%"
            mt={pxToDp(31)}
            mb={pxToDp(31)}
            h={pxToDp(109)}
            borderRadius={pxToDp(132)}
            bg="#fff"
            color="#0391e2"
            borderColor="#0391e2"
            borderWidth={pxToDp(2)}
          >
            恢复
          </Button>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            使用 3Box 同步数据（实验功能）
          </Text>
          <Text style={[styles.listText2]}>
            开启后可以用 3Box
            备份您的设置。此功能目前是实验功能，使用时风险自负。
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
              <Text>{hideNull ? "开" : "关"}</Text>
            </HStack>
          </Pressable>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            IPFS 网关
          </Text>
          <Text style={[styles.listText2]}>
            输入用于 ENS 内容解析的 IPFS CID 网关的 URL。
          </Text>
          <HStack mt={pxToDp(31)} w="100%" h={pxToDp(140)} alignItems="center">
            <Input
              variant="outline"
              type="text"
              w="100%"
              h={pxToDp(108)}
              fontSize={pxToDp(38)}
              fontWeight="500"
              color="#9FA1A8"
              borderColor="#bbc0c5"
              borderWidth={pxToDp(2)}
              backgroundColor="#EDEFF1"
              borderRadius={pxToDp(21)}
              value={searchValue}
              placeholder="Please input"
              _focus={{ borderColor: "#bbc0c5", backgroundColor: "#efefef" }}
              onChangeText={handleSetInput}
            />
          </HStack>
          <HStack mt={pxToDp(23)} w="100%" alignItems="center">
            <Button w={pxToDp(170)} borderRadius={pxToDp(80)} h={pxToDp(61)}>
              保存
            </Button>
          </HStack>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            首选Ledger连接类型
          </Text>
          <Text style={[styles.listText2]}>
            自定义您如何连接您的Ledger到Metamask。建议WebHID
            但其他选项可用。请阅读更多信息：查看更多
          </Text>
          <Select
            mt={pxToDp(41)}
            selectedValue={netType}
            minWidth="200"
            w="100%"
            h={pxToDp(101)}
            accessibilityLabel="Choose Service"
            placeholder="Choose"
            _selectedItem={{
              bg: "teal.600",
            }}
            onValueChange={(itemValue) => setNetType(itemValue)}
          >
            <Select.Item label="Ledger Live" value="Ledger" />
            <Select.Item label="U2F" value="U2F" />
            <Select.Item label="WebHID" value="WebHID" />
          </Select>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text mt={pxToDp(40)} style={[styles.listText1]}>
            消除账户助记词备份提醒
          </Text>
          <Text style={[styles.listText2]}>
            开启此选项以关闭账户助记词备份提醒消息。
            我们强烈建议您备份您的账户助记词，以避免资金损失
          </Text>
          <Pressable
            onPress={() => {
              setHideNull(!hideNull);
            }}
            mt={pxToDp(11)}
            mb={pxToDp(71)}
          >
            <HStack>
              <Image
                key={hideNull}
                w={pxToDp(135)}
                h={pxToDp(69)}
                source={hideNull ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
              ></Image>
              <Text>{hideNull ? "开" : "关"}</Text>
            </HStack>
          </Pressable>
        </VStack> */}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  listBox: {
    width: "100%",
  },
  listText1: {
    lineHeight: pxToDp(71),
    color: "#746969",
    fontWeight: "600",
    fontSize: pxToDp(41),
  },
  listText2: {
    color: "#746969",
    fontWeight: "600",
    fontSize: pxToDp(31),
    lineHeight: pxToDp(41),
  },
  buttonBlue: {
    width: pxToDp(858),
    borderRadius: pxToDp(30),
    color: "#0391e2",
    backgroundColor: "#5C50D2",
    borderColor: "#0391e2",
    borderWidth: 0,
  },
  buttonRed: {
    width: pxToDp(858),
    borderRadius: pxToDp(30),
    color: "#ED323F",
    backgroundColor: "#fff",
    borderColor: "#ED323F",
    borderWidth: pxToDp(2),
  },
});
export default React.memo(Advanced);
