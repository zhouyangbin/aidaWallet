import React from "react";
import { HStack, Flex, Center, Button, Image, Text } from "native-base";
import Header from "../component/Header";
import Icons from "../asset/Icon.js";

const quoteClickHandler = () => {};

const cancelClickHandler = () => {};

const exchangeClickHandler = () => {};
const ExchangeLoading = props => {
  return (
    <>
      <Flex alignItems="center">
        <HStack>
          <Text>最新报价 00:00</Text>
        </HStack>
        <HStack>
          <Text>最佳报价 </Text>
        </HStack>
        <HStack>
          <Text>10水晶币兑换</Text>
        </HStack>
        <HStack>
          <Text>$60:00</Text>
        </HStack>
        <HStack>
          <Text>10水晶币兑换</Text>
        </HStack>
        <HStack marginTop="4">
          <Center>
            <Button {...styles.backBtn} w="80" onPress={() => quoteClickHandler()}>
              报价标
            </Button>
          </Center>
        </HStack>

        <HStack marginTop="4">
          <Flex direction="row" justifyContent="center">
            <Button {...styles.cancelBtn} w="40" onPress={() => cancelClickHandler()}>
              取消
            </Button>
            <Button {...styles.backBtn} w="40" onPress={() => exchangeClickHandler()}>
              兑换
            </Button>
          </Flex>
        </HStack>
      </Flex>
    </>
  );
};

export default React.memo(ExchangeLoading);

const styles = {
  backBtn: {
    backgroundColor: "darkBlue.400",
    borderRadius: 20,
  },
  cancelBtn: {
    backgroundColor: "#bfbfbf",
    borderRadius: 20,
  },
};
