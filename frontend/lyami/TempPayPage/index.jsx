import React, { useMemo, useState, useEffect } from "react";
import {
  Avatar,
  HStack,
  VStack,
  Image,
  Text,
  Center,
  Divider,
  Pressable,
  Button,
  useToast,
} from "native-base";
import Icons from "../asset/Icon";
import AlertDialogComp from "../component/AlertDialogComp";
import { useNavigation } from "@react-navigation/native";
import Spin from "../component/Spin";
import PriorityEdit from "../component/PriorityEdit";
import {
  transform,
  estimateGas,
  resetGlobalWeb3,
} from "../api/web3/nativeCoin";
import global from "../api/util/global";
import { handleFormatAddress } from "@/../../frontend/lyami/api/util/helper";
import { SaveGlobalData } from "../api/localStorge/LocalStroge";

const AccountItem = (props) => {
  const { name } = props;
  return (
    <VStack alignItems="center">
      <Avatar
        source={{
          uri:
            "https://ipfs.gateway.lyami.net/ipfs/QmRpKV1Jq5XtnHJdU1rizD6jxqo6LyHvmWdJZVURMiRUG6",
        }}
        size="md"
      ></Avatar>
      <Text>{handleFormatAddress(name)}</Text>
    </VStack>
  );
};

const TempPayPage = (props) => {
  console.log(props);
  const {
    route: { params },
  } = props;
  const order = JSON.parse(params);
  const [alertShow, setAlertShow] = useState(false);
  const [priorityShow, setPriorityShow] = useState(false);
  const [gasFee, setGasFee] = useState();
  const [priority, setPriority] = useState(null);
  const [isSpin, setSpin] = useState(false);
  const navigate = useNavigation();
  const toast = useToast();
  // const handleAddLocalAddress = payload => {
  //   global.localOrderAddress.unshift(order.to);
  //   SaveGlobalData(global.CreateNewPassword);
  // };
  const myCallBack = (payload) => {
    console.log(payload);
    // handleAddLocalAddress();
    setSpin(false);
    //   next(step + 1);
  };
  const handleTransForm = (payload) => {
    console.log(priority);
    setSpin(true);
    if (priority) {
      transform(
        global.defaultKey,
        order.address,
        order.value,
        myCallBack,
        null,
        priority.priorityFeePerGas,
        null,
        priority.gasLimit,
        priority.maxFeePerGas
      )
        .then((e) => {
          console.log(e);
          setSpin(false);
          toast.show({
            description: "付款成功",
            duration: 1500,
            placement: "top",
          });
          navigate.goBack();
          //   next(step + 1);
        })
        .catch((e) => {
          toast.show({
            description: "付款失败",
            duration: 1500,
            placement: "top",
          });
          console.log(e);
        });
    } else {
      transform(global.defaultKey, order.address, order.value, myCallBack)
        .then((e) => {
          console.log(e);
          setSpin(false);
          toast.show({
            description: "付款成功",
            duration: 1500,
            placement: "top",
          });
          navigate.goBack();
          //   next(step + 1);
        })
        .catch((e) => {
          toast.show({
            description: "付款失败",
            duration: 1500,
            placement: "top",
          });
          console.log(e);
        });
    }
  };
  const handleGetGas = (payload) => {
    estimateGas(global.defaultKey, order.address, order.value)
      .then((e) => {
        setGasFee(e * 10 ** -9);
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //   const GasFee = useMemo(() => {
  //     console.log("memo");
  //     const res = handleGetGas();
  //     // console.log(res);
  //     // return await handleGetGas();
  //   }, [order.value, order.address]);
  useEffect(() => {
    const [net] = global.nativeCoinNetwork.filter(
      (item) => item.ChainId == order.chainId
    );
    resetGlobalWeb3(net.RPC, global.defaultKey.privateKey);
    handleGetGas();
    return () => {};
  }, []);

  return (
    <Spin isSpin={isSpin}>
      <HStack
        w="100%"
        mt="2"
        px="2%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Pressable
          w="15%"
          onPress={() => {
            return navigate.goBack();
          }}
        >
          <Image alt="img" size="2xs" source={Icons.backIcon}></Image>
        </Pressable>
        <Text flex="1" textAlign="center" fontSize="lg">
          付款给
        </Text>
        <HStack w="15%"></HStack>
      </HStack>
      <VStack height="100%" alignItems="center" flex="1" mt="6" w="100%">
        <HStack alignItems="center">
          <AccountItem name={order.address}></AccountItem>
        </HStack>
        <Center mt="6">
          <Text fontSize="30">
            {order.value} {order.coin}
          </Text>
        </Center>
        <VStack px="5%" w="100%">
          <Text mb="1">详情</Text>
          <Divider></Divider>
        </VStack>
        <VStack px="5%" py="2" w="100%">
          <HStack justifyContent="space-between">
            <VStack justifyContent="center" alignItems="center">
              <Text>燃油费</Text>
            </VStack>
            <VStack alignItems="flex-end">
              <Pressable
                onPress={() => {
                  setPriorityShow(true);
                }}
              >
                <Text color="darkBlue.400" fontSize="18">
                  编辑
                </Text>
              </Pressable>
              <Text color="rgba(155,155,155,1)">{gasFee}</Text>
              <Text>
                {gasFee} <Text>{order.coin}</Text>
              </Text>
              <Text>
                <Text color="rgba(155,155,155,1)">最高费用:{gasFee}</Text>
                <Text> {order.coin}</Text>
              </Text>
            </VStack>
          </HStack>
          <Divider mt="4"></Divider>
        </VStack>
        <VStack px="5%" py="2" w="100%">
          <HStack justifyContent="space-between">
            <VStack justifyContent="center" alignItems="center">
              <Text>总额</Text>
            </VStack>
            <VStack flex="1" alignItems="flex-end">
              <Text color="rgba(155,155,155,1)">$0.88</Text>
              <Text>
                <Text>
                  {order.value} {order.coin}+
                </Text>
                {gasFee}
                <Text> {order.coin}</Text>
              </Text>
              <HStack w="100%" flexWrap="wrap" justifyContent="flex-end">
                <Text color="rgba(155,155,155,1)">
                  最高费用: {order.value} <Text> {order.coin}</Text>
                </Text>
                <Text color="rgba(155,155,155,1)">
                  + {gasFee}
                  <Text> {order.coin}</Text>
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <Divider mt="4"></Divider>
        </VStack>
        <HStack w="100%" px="5%" pt="2" justifyContent="space-around">
          <Button
            onPress={() => {
              setAlertShow(true);
            }}
            bg="transparent"
            _text={{ color: "darkBlue.400" }}
            borderWidth="1"
            borderColor="darkBlue.400"
            w="40%"
            marginRight="10"
          >
            拒绝
          </Button>
          <Button
            onPress={() => {
              handleTransForm();
            }}
            bg="darkBlue.400"
            w="40%"
          >
            确认
          </Button>
        </HStack>
        <AlertDialogComp
          confirm={() => {
            navigate.goBack();
          }}
          title="提示"
          context="确定要放弃吗？"
          isOpen={alertShow}
          close={setAlertShow}
        ></AlertDialogComp>
        <PriorityEdit
          priority={priority}
          setPriority={setPriority}
          payload={{ value: order.value, name: order.coin }}
          show={priorityShow}
          close={setPriorityShow}
        ></PriorityEdit>
      </VStack>
    </Spin>
  );
};

export default React.memo(TempPayPage);
