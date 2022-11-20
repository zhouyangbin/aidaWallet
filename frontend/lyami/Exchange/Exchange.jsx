import React, { useEffect, useState, useMemo } from "react";
import { HStack, Stack, Flex, Center, Button, Image, Text, Divider, Heading } from "native-base";
import Header from "../component/Header";
import Icons from "../asset/Icon.js";
import { Pressable,View  } from "react-native";
import {WebView} from 'react-native-webview'
import SliderModal from "../Modal/SliderModal";
import { useNavigation } from "@react-navigation/native";
import SelectActionSheet from "../component/SelectActionSheet";
import { json } from "stream/consumers";
import global from "../api/util/global";

// 代币 收藏品列表假数据
const fakeArray = [];
let keys = [...new Array(20).keys()];
keys.map((item, index) => {
  fakeArray.push({
    title: `Coin${index + 1}`,
    content: [`余额：${Math.floor(Math.random() * (714 + 1)) + index}ETH`, `$${Math.floor(Math.random() * (714 + 1)) + index / 800}`],
    image: index % 2 == 0 ? Icons.usdtIcon : Icons.bnbIcon,
  });
});

const KEY_BOARD_MAP = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, `${Icons.leftArrowIcon}`];
const WHITE_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0];
const queue = [];

const keyBoardClickHandler = props => {
  const { setValue, value, navigation } = props;
  // navigation.navigate("PayOrder", {});
  //如果第一位是0，继续添加的值也为0，则不能添加
  if (queue.length === 0 && value === ".") return;
  //如果包含'.'， 则不能添加
  if (value === "." && queue.includes(".")) return;
  if (queue[0] === 0 && queue.length === 1 && value === 0) return;

  if (queue.length === 1 && !WHITE_LIST.includes(value)) {
    setValue(0);
    queue[0] = 0;
    return;
  } else if (!WHITE_LIST.includes(value)) {
    queue.pop();
    setValue(queue.join(""));
    return;
  }

  if (queue[0] === 0 && queue[1] === "." && WHITE_LIST.includes(value)) {
    queue.push(value);
  } else if (queue.length === 1 && value === ".") {
    queue.push(value);
  } else if (queue[0] === 0 && value !== "." && WHITE_LIST.includes(value)) {
    queue.shift();
    queue.push(value);
  } else if (queue[0] === 0 && value === ".") {
    queue.push(value);
  } else if (queue[0] !== 0 && WHITE_LIST.includes(value)) {
    queue.push(value);
  }

  setValue(queue.join(""));
};
const maxPointClickHandler = props => {
  const { setShowSliderModal } = props;
  setShowSliderModal(true);
};

const exchangeClickHandler = props => {
  console.log("value click");
  const { navigation } = props;
  navigation.navigate("ExGetPriceModal", {});
};
const showCoinList = props => {
  const { type, setType, setIsOpen } = props;
  console.log(type, setType, "type, setType, setShowModal");
  setType(type);
  setIsOpen(true);
};

const Exchange = props => {
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [changeDesc, setChangeDesc] = useState("");
  const [isChange, setIsChange] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState("");
  const [showSliderModal, setShowSliderModal] = useState(false);
  const [originCoin, setOriginCoin] = useState(fakeArray[0]);//上面按钮的代币信息
  const [exCoin, setExCoin] = useState({title: '选择代币'})

  const navigation = useNavigation();
  const accountArray = useMemo(() => {
    return fakeArray;
  }, []);
  const handleSelect = payload => {
    const { item } = payload;
    if (type === 'from') {
      setOriginCoin(item);
    } else if (type === 'to') {
      setExCoin(item)
    }
    console.log(item, "item");
    // alert(JSON.stringify(item));
    
  };

  const changeCoin = () => {
    setOriginCoin(exCoin);
    setExCoin(originCoin)
    // setIsChange(!isChange);
  };
  useEffect(() => {
    
  }, [])
  useEffect(() => {
    console.log(value, "value change");
    if (Number(value) > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    //判断输入的值 与当前默认的值大小
    let desc = "";
    if (value > 10) {
      desc = "没有足够的ETH以完成这次交换";
    } else {
      desc = "10 ETH 可供交换";
    }
    setChangeDesc(desc);
  }, [value]);
  return (
    <>
      <View style={{overflow: 'hidden', with: '100%', height: '100%'}}>
            <WebView
                originWhitelist={['*']}
                source={{uri: 'https://widget.onramper.com/?color=266677&apiKey=pk_test_HX385bPpagZasuFSoPzeU516Cie0w90vPEtSBZMbFHE0'}}
                scalesPageToFit={true}
            >
            </WebView>
        </View>
    </>
  );
};

export default React.memo(Exchange);

const styles = {
  backBtn: {
    backgroundColor: "darkBlue.400",
    borderRadius: 20,
  },
  selectBtn: {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "20",
    background: "#e6e6e6",
    paddingTop: "2",
    paddingLeft: "4",
    paddingBottom: "2",
    paddingRight: "4",
    mt: "16",
    position: "relative",
    // top: '20'
  },
  divider: {
    borderStyle: "solid",
    borderTopWidth: 1,
    width: "30%",
  },
};
