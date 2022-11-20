import {
  Modal,
  Image,
  Select,
  Input,
  useToast,
  ScrollView,
  PresenceTransition,
  AlertDialog,
  Box,
  HStack,
  Text,
  VStack,
  Button,
  Center,
  FormControl,
} from "native-base";
import React, { useState } from "react";
import { deflate } from "zlib";
import Swiper from "react-native-swiper";
import ape from "../../../assets/image/ape.webp";
import Icons from "../asset/Icon.js";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const list = [];
const keys = [...new Array(20).keys()];
keys.forEach((item, indx) => {
  list.push({
    id: indx,
    selected: false,
  });
});

const getInitFormData = payload => {
  const formDataArr = [];
  payload &&
    payload.forEach((item, index) => {
      formDataArr.push({
        marketPrice: "",
        currency: "",
        sellPrice: "",
        limitedDate: "",
      });
    });
  return formDataArr;
};
const ShelvesModal = props => {
  const { show, close, selectedList } = props;
  const initFormData = getInitFormData(selectedList);
  const [formData, setFormData] = useState(initFormData);
  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const setStepCallBack = payload => {
    setStep(payload);
  };

  const isRequireInfo = () => {
    //遍历表单数据，看每一个NFT信息是否填写完整
    /**
     * 三种情况
     * 1.每一个NFT+信息填写完整，上架时不弹提示信息  type : 1
     * 2.有一个及以上NFT+信息填写完整，上架时给弹窗提示，显示取消，继续按钮  type: 2
     * 3.一个及以上NFT+信息未填写完整，上架时提示请填写上架信息 type: 3
     */
    const res = [];
    for (let i = 0; i < formData.length; i++) {
      const item = formData[i];
      if (item["marketPrice"] && item["currency"] && item["sellPrice"] && item["limitedDate"]) {
        //一个NFT 完整信息
        res.push(1);
      } else if (!item["marketPrice"] && !item["currency"] && !item["sellPrice"] && !item["limitedDate"]) {
        //一个NFT 任何一个字段都没有填写
        res.push(2);
      } else {
        res.push(3);
      }
    }

    return res;

    // if (res.includes(3)) {//如果res包含3，说明有NFT+未填写完成
    //   return false
    // } else if(res.includes(2)) {// 有一个及以上没有填，提示填写信息
    // }
  };
  const onShelvesClickHandler = props => {
    // 上架前需要判断信息是否填写完成，1.必须完整填写一个NFT+信息才可以上架，否则提示用户填写完整
    let res = isRequireInfo();
    if (res.includes(3)) {
      toastShow({ text: "请填写上架信息！", type: "warning" })["warning"]();
    } else if (res.every(item => item === 2)) {
      //全部是2，代表一个NFT+ 信息都没填写
      toastShow({ text: "请填写上架信息！", type: "warning" })["warning"]();
    } else if (res.includes(2)) {
      setIsOpen(true);
    } else {
      //如果都填写完成，直接上架
      console.log("信息填写完整，直接上架");
      shelvesFetch();
    }
  };

  const shelvesFetch = () => {
    toastShow({ text: "上架成功", type: "warning" })["success"]();
  };
  const toastShow = props => {
    const { text } = props;
    return {
      warning: () => {
        toast.show({
          placement: "top",
          duration: 2000,
          render: () => {
            return (
              <Box bg="#d81e06" _text={{ color: "#fff" }} px="2" py="1" rounded="sm" mb={5}>
                {text}
              </Box>
            );
          },
        });
      },
      success: () => {
        toast.show({
          placement: "top",
          duration: 2000,
          render: () => {
            return (
              <Box bg="#1296db" _text={{ color: "#fff" }} px="2" py="1" rounded="sm" mb={5}>
                {text}
              </Box>
            );
          },
        });
      },
    };
  };

  const goToPayOrder = props => {
    console.log(22222);
  };
  const changeHandler = props => {
    const { field, value, index } = props;
    console.log(field, value, index, "change ");
    const tempObj = [...formData];
    //设置一个临时变量，修改临时变量，然后将临时变量赋值给state，记住state 是不可变原则，不能直接修改state
    tempObj[index][field] = value;
    setFormData(tempObj);
  };
  return (
    <>
      <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} goToPage={goToPayOrder} />
      <Modal isOpen={show} onClose={() => close(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Center>上架</Center>
          </Modal.Header>
          <Modal.Body>
            <VStack h="440px">
              <StepTwo selectedList={selectedList} formData={formData} changeHandler={changeHandler} />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bg="#1296db"
              w="100%"
              onPress={() => {
                onShelvesClickHandler();
              }}
            >
              上架
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

const Tabs = props => {
  const tabArr = ["NFTS", "地产"];
  return (
    <HStack>
      {tabArr.map((item, index) => {
        return (
          <Box key={index}>
            <Text>{item}</Text>
          </Box>
        );
      })}
    </HStack>
  );
};

const ConfirmModal = props => {
  const { isOpen, setIsOpen, goToPage } = props;
  // const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content w="80%">
        <AlertDialog.CloseButton />
        <AlertDialog.Header>
          <Center>
            <Text fontSize="20px">信息提示</Text>
          </Center>
        </AlertDialog.Header>
        <AlertDialog.Body>
          <Center>
            <Text>您还有收藏品的上架信息未填写，是否直接上架？</Text>
            <Text mt="2" color="#d81e06">
              (一起上架的话，只收取一次GAS费用哦)
            </Text>
          </Center>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <HStack justifyContent="space-around" alignItems="center" space={8} pr="2">
            <Button {...styles.btn} bg="#d81e06" onPress={() => setIsOpen(false)}>
              取消
            </Button>
            <Button {...styles.btn} bg="#1296db" onPress={() => goToPage()}>
              继续
            </Button>
          </HStack>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
const StepTwo = props => {
  const { selectedList, formData, changeHandler } = props;
  const [coinNumber, setCoinNumber] = useState("");
  const navigation = useNavigation();

  const [value, setValue] = useState("2222222");

  // const handleChange = text => setValue(text);
  const handleChange = payload => {
    changeHandler(payload);
  };
  return (
    <Swiper>
      {formData.map((item, index) => {
        return (
          <ScrollView key={index}>
            <VStack alignItems="center">
              <Text>NFT编号</Text>
              <Image alt="img" source={ape} size="sm" borderRadius="40" />
              <Box w="60%">
                <HStack alignItems="center">
                  <FormControl>
                    <FormControl.Label>市场价</FormControl.Label>
                    <Input
                      h="40px"
                      w="150px"
                      value={item.marketPrice}
                      onChangeText={text => handleChange({ field: "marketPrice", value: text, index })}
                      _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }}
                      type="text"
                      placeholder="请输入市场价"
                    />
                    <FormControl.ErrorMessage>市场价不能为空</FormControl.ErrorMessage>
                  </FormControl>
                  <Pressable onPress={() => navigation.navigate("TrendPage", {})}>
                    <Image alt="img" ml="3" mt="6" size="8" source={Icons.trendDarkIcon} />
                  </Pressable>
                </HStack>

                <FormControl>
                  <FormControl.Label>货币</FormControl.Label>
                  <Select
                    w="150px"
                    selectedValue={item.currency}
                    defaultValue={item.currency}
                    minWidth="150"
                    h="10"
                    accessibilityLabel="Choose Service"
                    placeholder="请选择货币"
                    _selectedItem={{
                      // bg: "teal.600",
                      endIcon: <Image alt="img" size="5" source={Icons.arrowDownIcon} />,
                    }}
                    _dark={{
                      bg: "coolGray.800",
                    }}
                    onValueChange={itemValue => handleChange({ field: "currency", value: itemValue, index })}
                  >
                    {["USDT", "USDT1", "USDT2", "USDT3", "USDT4"].map((item, index) => {
                      return <Select.Item key={item} shadow={2} label={item} value={item} />;
                    })}
                  </Select>
                  <FormControl.ErrorMessage>请选择货币!</FormControl.ErrorMessage>
                </FormControl>
                <FormControl>
                  <FormControl.Label>出售价格</FormControl.Label>
                  <Input
                    h="40px"
                    w="150px"
                    value={item.sellPrice}
                    onChangeText={text => handleChange({ field: "sellPrice", value: text, index })}
                    _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }}
                    type="text"
                    placeholder="请填写价格"
                  />
                  <FormControl.ErrorMessage>出售价不能为空</FormControl.ErrorMessage>
                </FormControl>
                <FormControl>
                  <FormControl.Label>有效期</FormControl.Label>
                  <Select
                    w="150px"
                    selectedValue={item.limitedDate}
                    defaultValue={item.limitedDate}
                    minWidth="150"
                    h="10"
                    accessibilityLabel="Choose Service"
                    placeholder="请选择有效期"
                    _selectedItem={{
                      endIcon: <Image alt="img" size="5" source={Icons.arrowDownIcon} />,
                    }}
                    _dark={{
                      bg: "coolGray.800",
                    }}
                    onValueChange={itemValue => handleChange({ field: "limitedDate", value: itemValue, index })}
                  >
                    {["7Days", "15Days", "30Days"].map((item, index) => {
                      return <Select.Item key={item} shadow={2} label={item} value={item} />;
                    })}
                  </Select>
                  <FormControl.ErrorMessage>请选择货币!</FormControl.ErrorMessage>
                </FormControl>
              </Box>
            </VStack>
          </ScrollView>
        );
      })}
    </Swiper>
  );
};

export default React.memo(ShelvesModal);

const styles = {
  parent: {
    backgroundColor: "#33ddfa",
    padding: "1px",
    width: "20px",
    height: "20px",
    borderRadius: 20,
  },
  btn: {
    paddingLeft: "50px",
    paddingRight: "50px",
    borderRadius: "40px",
  },
};
