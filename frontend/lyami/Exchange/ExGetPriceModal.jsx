import React, { useEffect, useState } from "react";
import { HStack, Text, Image, Flex, Button, Progress, Center, Modal } from "native-base";

import { deflate } from "zlib";
import Icons from "../asset/Icon.js";
import { useNavigation } from "@react-navigation/native";
import Header from "../component/Header";
import { solidity } from "ethereum-waffle";
import { Pressable } from "react-native";

//兑换加载组件
const Loading = props => {
  const [value, setValue] = useState(0);
  let a = 0;
  // setInterval(() => {
  //   a++
  //   setValue(a)
  // }, 200)
  useEffect(() => {
    setValue(value + 1);
  }, [value]);

  return (
    <Flex alignItems="center" justifyContent="center">
      <HStack mt="30%" mb="4">
        <Text fontSize="20" color="#515151" fontWeight="bold">
          取得报价中
        </Text>
      </HStack>
      <HStack w="90%">
        <Center w="100%">
          <Progress w="90%" size="xs" mb={4} value={value} />
        </Center>
      </HStack>
      <HStack>
        <Image alt='img' mt="20" size="lg" source={Icons.loadingIcon} />
      </HStack>
    </Flex>
  );
};

// 兑换加载失败组件
const LoadingErr = props => {
  const { setIsLoading } = props;
  return (
    <Flex alignItems="center" justifyContent="center">
      <HStack>
        <Image alt='img' size={10} mt="40%" source={Icons.errorIcon} />
      </HStack>
      <HStack>
        <Text fontSize="20" mb="4" mt="4" fontWeight="bold">
          取得报价时出错
        </Text>
      </HStack>
      <HStack w="70%" mb="40%">
        <Text fontSize="14" mb="4" mt="4">
          出现意外错误，请重新请求报价以获得最新的最佳价格。（错误：请求超时了，）
        </Text>
      </HStack>
      <HStack>
        <Button
          w="90%"
          {...styles.tryBtn}
          onPress={() => {
            setIsLoading(true);
            // tryAgain();
          }}
        >
          再试一次
        </Button>
      </HStack>
    </Flex>
  );
};

const tryAgain = () => {
  console.log("再试一次");
};

const goToMainPage = props => {
  const { navigation } = props;

  navigation.navigate("WalletMainNew", {});
};
//兑换成功界面
const ChangeSuccess = props => {
  const navigation = useNavigation();
  const goToRecordPage = () => {
    navigation.navigate("", {});
  };
  return (
    <Flex alignItems="center">
      <HStack>
        <Text fontSize="18" fontWeight="bold" mt="20" mb="5">
          交易完成
        </Text>
      </HStack>
      <HStack mt="5" mb="5">
        <Text color="#515151">
          您的<Text fontWeight="bold">10水晶币-10BUSD</Text>已添加到您的账户
        </Text>
      </HStack>

      <HStack mb="4" alignItems="center">
        <Pressable onPress={() => goToRecordPage({ navigation })}>
          <Text color="#08af93">在记录中查看</Text>
        </Pressable>
      </HStack>
      <HStack marginTop="4">
        <Center>
          <Button {...styles.backBtn} mt="250" w="80" onPress={() => goToMainPage({ navigation })}>
            返回
          </Button>
        </Center>
      </HStack>
    </Flex>
  );
};
//兑换 -信息详情界面
const ExSuccess = props => {
  const [showModal, setShowModal] = useState(false);
  const { changeState } = props;
  const navigation = useNavigation();
  const exchangeCoinRate = () => {
    console.log("改变汇率");
  };

  const exchangeClickHandler = props => {
    // const {changeState} = props
    changeState(true);
    // alert("兑换中");
  };
  return (
    <>
      <QuoteDetail showModal={showModal} setShowModal={setShowModal}></QuoteDetail>
      <Flex alignItems="center">
        <HStack mt="6" mb="5">
          <Text>最新报价 00:00</Text>
        </HStack>
        <HStack>
          <Text fontSize="18" mb="5">
            最佳报价{" "}
          </Text>
        </HStack>
        <HStack mt="5" mb="5">
          <Text color="#515151">10水晶币兑换</Text>
        </HStack>
        <HStack mb="5">
          <Text fontSize="28" fontWeight="bold">
            $60:00
          </Text>
        </HStack>
        <HStack mb="4" alignItems="center">
          <Text>1水晶币=10美金</Text>
          <Pressable onPress={() => exchangeCoinRate()}>
            <Image alt='img' ml="2" size="5" source={Icons.exchangeRateIcon} />
          </Pressable>
        </HStack>
        <HStack marginTop="4">
          <Center>
            <Button {...styles.backBtn} w="80" onPress={() => quoteClickHandler({ setShowModal })}>
              报价表
            </Button>
          </Center>
        </HStack>
        <HStack mt="10" direction="column" {...styles.tableBorder} w="80%">
          <Flex direction="row" pl="10" pr="10" alignItems="center" justifyContent="space-between">
            <Text w="1/2" textAlign={"center"} fontSize="16" color="#515151">
              预估燃油费
            </Text>
            <Text w="1/2" textAlign={"center"} fontSize="16" color="#515151">
              10000水晶币 $10
            </Text>
          </Flex>
          <Flex direction="row" mt="2" pl="10" pr="10" alignItems="center" justifyContent="space-between">
            <Text w="1/2" textAlign={"center"} fontSize="16" color="#515151">
              预估燃油费
            </Text>
            <Text w="1/2" textAlign={"center"} fontSize="16" color="#515151">
              10000水晶币 $10
            </Text>
          </Flex>
        </HStack>
        <HStack marginTop="10">
          <Flex direction="row" justifyContent="center">
            <Button {...styles.cancelBtn} w="40" onPress={() => cancelClickHandler({ navigation })}>
              取消
            </Button>
            <Button {...styles.backBtn} w="40" onPress={() => exchangeClickHandler({ changeState })}>
              兑换
            </Button>
          </Flex>
        </HStack>
      </Flex>
    </>
  );
};

const quoteClickHandler = props => {
  const { setShowModal } = props;
  setShowModal(true);
};

const cancelClickHandler = props => {
  const { navigation } = props;
  navigation.navigate("Exchange", {});
};

//报价细节弹窗
const QuoteDetail = props => {
  const { showModal, setShowModal } = props;

  return (
    <>
      <Modal isOpen={showModal} w="100%" onClose={() => setShowModal(false)}>
        <Modal.Content {...styles.bottom}>
          <Modal.CloseButton />
          <Modal.Body>
            <Center
              _text={{
                color: "black",
                fontWeight: "bold",
                fontSize: "18",
                paddingBottom: 8,
              }}
            >
              报价细节
            </Center>
            <HStack>
              <Text>将10水晶币兑换为约</Text>
            </HStack>
            <Center alignItems="center" mt="3">
              <HStack alignItems="center" justifyContent="center">
                <Text w="1/2" fontWeight="bold" textAlign="center">
                  代币价
                </Text>
                <Text w="1/2" fontWeight="bold" textAlign="center">
                  燃油费
                </Text>
              </HStack>
            </Center>

            <Center alignItems="center">
              <HStack alignItems="center" {...styles.border} justifyContent="center">
                <Text w="1/2" textAlign="center">
                  代币价
                </Text>
                <Text w="1/2" textAlign="center">
                  燃油费
                </Text>
              </HStack>
            </Center>
            <Center alignItems="center">
              <HStack alignItems="center" {...styles.border} justifyContent="center">
                <Text w="1/2" textAlign="center">
                  代币价
                </Text>
                <Text w="1/2" textAlign="center">
                  燃油费
                </Text>
              </HStack>
            </Center>
            <Center alignItems="center">
              <HStack alignItems="center" {...styles.border} justifyContent="center">
                <Text w="1/2" textAlign="center">
                  代币价
                </Text>
                <Text w="1/2" textAlign="center">
                  燃油费
                </Text>
              </HStack>
            </Center>
            <Flex direction="row" mt="10" pl="4" pr="4" justifyContent="space-between">
              <Button w="1/3" onPress={() => setShowModal(false)} {...styles.cancelBtn}>
                关闭
              </Button>
              <Button w="1/3" onPress={() => confirmClickHandler({ setShowModal })} {...styles.backBtn}>
                确定
              </Button>
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

const confirmClickHandler = props => {
  const { setShowModal } = props;
  setShowModal(false);
};
const ExGetPriceModal = props => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [changeState, setChangeState] = useState(false);
  return (
    <>
      <Header>兑换</Header>
      {/* <Button
        onPress={() => {
          setIsLoading(!isLoading);
        }}
      >
        再试一次
      </Button> */}
      {/* {isLoading ? <Loading /> : <LoadingErr setIsLoading={setIsLoading} />} */}
      {changeState ? <ChangeSuccess /> : <ExSuccess changeState={setChangeState} />}
    </>
  );
};

export default React.memo(ExGetPriceModal);

const styles = {
  tryBtn: {
    backgroundColor: "darkBlue.400",
    borderRadius: 20,
  },
  backBtn: {
    backgroundColor: "darkBlue.400",
    borderRadius: 20,
  },
  cancelBtn: {
    backgroundColor: "#bfbfbf",
    borderRadius: 20,
  },
  border: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRadius: 4,
    height: 10,
    marginTop: 2,
  },
  tableBorder: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
  },
};
