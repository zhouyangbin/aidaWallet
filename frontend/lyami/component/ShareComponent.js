/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-08 10:56:59
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-10-09 16:58:16
 * @FilePath: \project\frontend\lyami\component\ShareComponent.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, Image, Center, Box, Flex, View, Actionsheet, Pressable, VStack } from "native-base";
import Icons from "../asset/Icon.js";
import { pxToDp } from "../../utils/stylesKits.js";
import Button from "./Button.jsx";
import { I18n } from "../../language/I18n";

function requestForPaymentClick(navigation) {
  navigation.navigate("Payment", {});
}

const shareType = (shareType) => {
  console.log(shareType, "sharetype");
};

const SHARE_TYPE = [
  { type: "weixin", url: Icons.weixinIcon, title: "Weixin" },
  { type: "save", url: Icons.saveIcon, title: "Save image" },
  { type: "weibo", url: Icons.weiboIcon, title: "Weibo" },
  { type: "twitter", url: Icons.twitterIcon, title: "Twitter" },
  { type: "qq", url: Icons.qqIcon, title: "QQ" },
  { type: "taobao", url: Icons.taobaoIcon, title: "Taobao" },
  { type: "alipay", url: Icons.alipayIcon, title: "Alipay" },
  { type: "facebook", url: Icons.facebookIcon, title: "Facebook" },
];
/**
 *
 * @param {showModal：Boolean, setShowModal: Function} props
 * @returns
 */
const ShareComponent = (props) => {
  const navigation = useNavigation();
  const { showModal, setShowModal } = props;
  return (
    <>
      <Actionsheet isOpen={showModal} size="full" onClose={() => setShowModal(false)}>
        <Actionsheet.Content alignItems="center">
          <Text mb={pxToDp(50)} fontSize={pxToDp(54)} fontWeight="800">
            {/* Share */}
            {I18n.t('receive.share')}
          </Text>
          <Flex direction="row" flexWrap="wrap">
            {SHARE_TYPE.map((item, index) => {
              return (
                <Pressable w="25%" key={`${item.url}${index}`} onPress={() => shareType(item.type)}>
                  <VStack alignItems="center" mb={pxToDp(50)}>
                    <Image alt="image bad" source={item.url} w={pxToDp(126)} h={pxToDp(126)} />
                    <Text color="#181818" fontWeight='500' fontSize={pxToDp(32)}>{item.title}</Text>
                  </VStack>
                </Pressable>
              );
            })}
          </Flex>
          <Button
            mt={pxToDp(40)}
            mb={pxToDp(40)}
            type="lg"
            borderWidth={pxToDp(3)}
            bg="transparent"
            borderColor="#5C50D2"
            color="#5C50D2"
            onPress={() => setShowModal(false)}
          >
           {I18n.t('receive.cancel')}
          </Button>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default React.memo(ShareComponent);
