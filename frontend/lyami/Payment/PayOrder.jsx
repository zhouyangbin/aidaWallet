import React, { useState } from "react";
import { HStack, Flex, Modal, Stack, Center, Button, Box, useToast, Image, Text, Input, Pressable, Slider, Actionsheet, Divider, VStack, ScrollView, Avatar } from "native-base";
import Header from "../component/Header";
import Icons from "../asset/Icon.js";
import { NavigationContainerRefContext, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { handleFormatAddress } from "@/../../frontend/lyami/api/util/helper";
// import {contractAddress} from '../api/util/constant';
import config from "../api/util/config";
import global from "../api/util/global";

const payClickHandler = props => {
  const { setIsPay, setPayState } = props;
  setTimeout(() => {
    console.log("支付");
    setPayState(false);
    setIsPay(true);
  }, 2000);
};

// 前往购买
const buyClickHandler = props => {
  const { toast } = props;
  toast.show({
    description: "当前燃料费余额不足，请前往购买/兑换代币资产",
    placement: "top",
    duration: 2000,
    // render: () => {
    //     return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
    //             当前燃料费余额不足，请前往购买/兑换
    //           </Box>;
    // }
  });
};

// 前往兑换
const exchangeClickHandler = props => {
  const { toast } = props;
  toast.show({
    description: "水晶币不足，请前往购买/兑换代币资产",
    placement: "top",
    duration: 2000,
  });
};
const IsNotPay = props => {
  const { data } = props;
  const toast = useToast();
  const { setIsPay, type } = props;
  const [payState, setPayState] = useState(false);
  return (
    <>
      {type === "ownPay" ? (
        <InnerPay data={data} payState={payState} setIsPay={setIsPay} setPayState={setPayState} />
      ) : (
        <OuterPay payState={payState} setPayState={setPayState} setIsPay={setIsPay}></OuterPay>
      )}
    </>
  );
};

//返回商家
const goBack = props => {
  const { navigation } = props;
  navigation.goBack();
};

//编辑
const editeClickHandler = props => {
  console.log("编辑");
};

//确认支付
const confirmClickHandler = props => {
  const { setIsPay } = props;
  setIsPay(true);
  console.log("确认支付");
};

const inputChangeHandler = props => {
  const { inputValue, text, setOnChangeValue } = props;
  console.log(inputValue, text, "inputvalue");
  setOnChangeValue(Number(text));
};
//燃油费编辑组件
const EditeComponent = props => {
  const [editeModalShow, setEditeModalShow] = useState(false);
  const [onChangeValue, setOnChangeValue] = React.useState(70);
  const [onChangeEndValue, setOnChangeEndValue] = React.useState(70);
  const [inputValue, setInputValue] = useState("");
  return (
    <Actionsheet isOpen={editeModalShow} onClose={() => setEditeModalShow(false)}>
      <Actionsheet.Content>
        <Text {...styles.textColor} bold>
          燃油费
        </Text>
        <Box alignItems="center" w="100%" mb="4" mt="6">
          <Slider
            w="90%"
            defaultValue={onChangeValue}
            step={5}
            size="lg"
            onChange={v => {
              setOnChangeValue(Math.floor(v));
            }}
            onChangeEnd={v => {
              v && setOnChangeEndValue(Math.floor(v));
            }}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Text textAlign="center">onChangeValue - {onChangeValue}</Text>
          <Text textAlign="center">onChangeEndValue - {onChangeEndValue}</Text>
          <HStack>
            <Input
              variant="outline"
              type="text"
              w="40%"
              h="10"
              value={onChangeValue}
              placeholder="请输入燃油费"
              _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }}
              onChangeText={text => inputChangeHandler({ text, setOnChangeValue, inputValue })}
              InputRightElement={<Image alt="image" source={Icons.editeIcon} size="6" />}
            />
          </HStack>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

const AccountItem = props => {
  const { name } = props;
  return (
    <VStack alignItems="center">
      <Avatar
        source={{
          uri: "https://ipfs.gateway.lyami.net/ipfs/QmRpKV1Jq5XtnHJdU1rizD6jxqo6LyHvmWdJZVURMiRUG6",
        }}
        size="md"
      ></Avatar>
      <Text>{handleFormatAddress(name)}</Text>
    </VStack>
  );
};

const DetailModal = props => {
  const {show, close} = props
  return (
    <Modal isOpen={show} onClose={close} size='lg'>
      <Modal.Content maxH="412" h='380'>
        <Modal.CloseButton />
        <Modal.Header>详情内容</Modal.Header>
        <Modal.Body >
          <VStack space='1'>
            <Text>交易类型： 市场</Text>
            <VStack>
              <Text>交易行为</Text>
              <VStack ml='8'>
                <Text>交易内容：（交易的是什么，需要多少MATIC代币）</Text>
                <Text>交易地点： 乐亚米市场</Text>
                <Text>代币ID： （具体交易物品的ID）</Text>
              </VStack>
            </VStack>
            <Text>交易者地址： 账号地址</Text>
            <HStack>
              <Text>交易价格： </Text>
              <VStack>
                <Text>（谁向谁支付xxx MATIC代币）</Text>
                <Text>（谁向谁支付xxx 其他代币代币）</Text>
              </VStack>
            </HStack>
            <Text>价值：(交易价格 (价值多少美元))</Text>
            <Text>gas费用： 333 MATIC</Text>

          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

//钱包内支付
const InnerPay = props => {
  const { data } = props;
  const [show, setShow] = useState(true);
  const { setIsPay, payState, setPayState } = props;
  const navigation = useNavigation();
  const lookForDetail = payload => {
    // navigation.navigate('HistoryList', {})
    setShow(true)
  };
  const closeModal = payload => {
    setShow(false)
  }
  return (
    <Stack>
      <Flex h="80%" alignItems="center" padding="4">
        <EditeComponent />
        {/* <HStack>
          <Text bold mt="3" mb="4" fontSize="20">
            支付给
          </Text>
        </HStack> */}
        <DetailModal show={show} close={closeModal}/>
        <HStack alignItems="center" mt="8">
          <AccountItem name={config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]}></AccountItem>
          <Image alt='img' mx="12" size="10" source={Icons.translateRIcon}></Image>
          <AccountItem name={config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]}></AccountItem>
        </HStack>

        <HStack pl="4" mt="8" mb="2" w="100%" justifyContent="flex-start">
          <Text {...styles.textBold}>详情</Text>
          {/* <Divider/> */}
        </HStack>
        <Divider />
        <ScrollView>
          <HStack w="100%" padding="4" alignItems="center" justifyContent="space-between">
            <Text {...styles.textBold} w="1/5">
              价格
            </Text>
            <HStack w="4/5">
              <ScrollView horizontal={true} w="100%">
                <HStack space="4">
                  {[1, 1, 1, 4, 5, 3].map((item, index) => {
                    return (
                      <VStack alignItems="center" key={index}>
                        <Text bold fontSize="16px" color="#1296db">
                          交易{index}
                        </Text>
                        <Text mt="2" bold fontSize="16px">
                          -20.00 MATIC
                        </Text>
                        <Text>(- 10 USD)</Text>
                      </VStack>
                    );
                  })}
                </HStack>
              </ScrollView>
            </HStack>
          </HStack>
          <Divider />

          <HStack w="100%" padding="4" alignItems="center" justifyContent="space-between">
            <Text {...styles.textBold} w="1/4">
              总额
            </Text>
            <VStack w="3/4" space={2}>
              <Text {...styles.text}>100 水晶币+0.0000500 水晶币</Text>
              <HStack alignItems="center" justifyContent="flex-end">
                <Text {...styles.textColor} {...styles.textBold}>
                  最高费用:
                </Text>
                <Text {...styles.textColor} ml="2" mr="2">
                  100
                </Text>
                <Text {...styles.textColor} bold>
                  水晶币
                </Text>
              </HStack>
              <Text {...styles.text} {...styles.textColor}>
                +0.0000500 水晶币
              </Text>
            </VStack>
          </HStack>
          <Divider />

          <VStack w="100%">
            <HStack w="100%" padding="4" alignItems="center" justifyContent="space-between">
              <Text {...styles.textBold} w="1/4">
                GAS费
              </Text>
              <VStack w="3/4" space={2}>
                <Pressable onPress={() => editeClickHandler()}>
                  <Text {...styles.text} color="#1296db">
                    编辑
                  </Text>
                </Pressable>
                <Text {...styles.text}>0.0000500</Text>
                <Text {...styles.text} {...styles.textBold}>
                  0.0000500 水晶币
                </Text>
                <HStack alignItems="center" justifyContent="flex-end">
                  <Text {...styles.textColor} {...styles.textBold}>
                    最高费用:
                  </Text>
                  <Text {...styles.textColor} ml="2" mr="2">
                    0.000050
                  </Text>
                  <Text {...styles.textBold}>水晶币</Text>
                </HStack>
              </VStack>
            </HStack>
            <Divider />
          </VStack>
          {data &&
            data.map((item, index) => {
              return (
                <VStack w="100%" key={index}>
                  <HStack w="100%" padding="4" alignItems="center" justifyContent="space-between">
                    <Text {...styles.textBold} w="1/4">
                      {item.title}
                    </Text>
                    <VStack w="3/4" space={2}>
                      <Text {...styles.text}>NFT编号{item.number}</Text>
                      <Text {...styles.text} {...styles.textBold}>
                        价格： {item.price} 水晶币
                      </Text>
                      <Text {...styles.text} {...styles.textBold}>
                        订单编号： {item.number}
                      </Text>
                      <Text {...styles.text} {...styles.textBold}>
                        订单时间： {moment().format("YYYY-MM-DD HH:mm:ss")}{" "}
                      </Text>
                    </VStack>
                  </HStack>
                  <Divider />
                </VStack>
              );
            })}

          <HStack w="100%" padding="4" alignItems="center" justifyContent="space-between">
            <Text w="1/4" {...styles.textBold}>
              交易信息
            </Text>
            <HStack w="3/4" alignItems="center" justifyContent="flex-end">
              <Button variant="unstyled" _text={{ textAlign: "right", color: "#1296db", fontSize: "20px" }} onPress={() => lookForDetail()}>
                查看详情
              </Button>
            </HStack>
          </HStack>
          <Divider />

          <HStack w="100%" padding="4" alignItems="center" justifyContent="space-between">
            <Text w="3/4" {...styles.textBold}>
              获得
            </Text>
            <VStack w="1/4" alignItems="center" justifyContent="flex-end">
              <Image alt='img' source={Icons.usdtIcon} size="sm" />
              <Text>NFT+编号</Text>
            </VStack>
          </HStack>
          <Divider />
        </ScrollView>
      </Flex>
      <HStack h="20%" mt="8" pl="6" pr="6" space={4} justifyContent="space-between">
        <Button {...styles.refuse} w="40" h="40px" _text={{ color: "darkBlue.400", fontWeight: "bold" }} onPress={() => navigation.goBack()}>
          拒绝
        </Button>
        <Button {...styles.backBtn} w="40" h="40px" _text={{ fontWeight: "bold" }} onPress={() => confirmClickHandler({ setIsPay, setPayState })}>
          确认
        </Button>
      </HStack>
    </Stack>
  );
};

// 第三方支付
const OuterPay = props => {
  const { setIsPay, setPayState, payState } = props;

  return (
    <Flex alignItems="center">
      <HStack>
        <Text bold mt="10" mb="4" fontSize="20">
          订单名称
        </Text>
      </HStack>
      <HStack>
        <Text fontSize="16">xxxxxxxxxxx</Text>
      </HStack>
      <HStack>
        <Text bold fontSize="22" mt="4">
          0.00 水晶币
        </Text>
      </HStack>
      <HStack marginTop="120">
        <Center>
          {payState ? (
            <Button {...styles.backBtn} w="80" isLoading isLoadingText="立即支付">
              {/* 立即支付 */}
            </Button>
          ) : (
            <Button {...styles.backBtn} w="80" onPress={() => payClickHandler({ setIsPay, setPayState })}>
              立即支付
            </Button>
          )}
        </Center>
      </HStack>
      <HStack mt="8" w="50%" justifyContent="space-between">
        <Pressable onPress={() => buyClickHandler({ toast })}>
          <Text fontSize="16" underline={true} color="#1296db" bold>
            前往购买
          </Text>
        </Pressable>
        <Pressable onPress={() => exchangeClickHandler({ toast })}>
          <Text fontSize="16" underline={true} color="#1296db" bold>
            前往兑换
          </Text>
        </Pressable>
      </HStack>
    </Flex>
  );
};

//支付成功页面
const IsPay = props => {
  const navigation = useNavigation();
  const { setIsPay, type } = props;

  const checkClickHandler = props => {
    const { setIsPay } = props;
    setIsPay(false);
    // navigation.navigate('HistoryList', {})
  };
  return (
    <Flex alignItems="center">
      <HStack>
        <Text bold mt="10" mb="4" fontSize="20">
          交易完成
        </Text>
      </HStack>
      <HStack>
        <Text fontSize="16">xxxxxxxxxxx</Text>
      </HStack>
      <HStack>
        <Text bold fontSize="22" mt="4">
          0.00{" "}
        </Text>
      </HStack>
      <HStack marginTop="100">
        <Center>
          {type === "ownPay" ? (
            <Pressable onPress={() => checkClickHandler({ setIsPay })}>
              <Text underline color="blue.500" fontSize="22" marginTop="4">
                在记录中查看
              </Text>
            </Pressable>
          ) : (
            <Button {...styles.backBtn} w="80" onPress={() => goBack({ navigation })}>
              返回商家
            </Button>
          )}
        </Center>
      </HStack>
    </Flex>
  );
};

/**
 *
 * @param {*} props
 * @returns
 */
const PayOrder = props => {
  console.log(props.route.params, "params");
  const { payload } = props.route.params || true;
  const [productDetail, setProductDetail] = useState(payload);
  const [isPay, setIsPay] = useState(false); //是否支付
  const [payType, setPayType] = useState("ownPay"); // ownPay:钱包内支付 ，thirdPay: 第三方支付
  return (
    <>
      <HStack>
        <Header>支付订单</Header>
      </HStack>
      {!isPay ? <IsNotPay data={productDetail} setIsPay={setIsPay} type={payType} /> : <IsPay type={payType} setIsPay={setIsPay} />}
    </>
  );
};

export default React.memo(PayOrder);

const styles = {
  backBtn: {
    backgroundColor: "darkBlue.400",
    borderRadius: 20,
  },
  refuse: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#1296db",
    borderRadius: 20,
  },
  text: {
    width: "100%",
    textAlign: "right",
    fontSize: 16,
    fontWeight: "bold",
  },
  textBold: {
    fontSize: 16,
    // fontWeight: "bold",
  },
  textColor: {
    fontSize: 16,
    color: "#8a8a8a",
  },
};
