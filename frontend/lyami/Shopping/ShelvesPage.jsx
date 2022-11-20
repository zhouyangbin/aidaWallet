import { Modal, Image, Select, Stack, Input, ScrollView, FlatList, PresenceTransition, Box, HStack, Text, VStack, Button, Center, FormControl, AlertDialog } from "native-base";
import React, { useState } from "react";
import { deflate } from "zlib";
import Swiper from "react-native-swiper";
import ape from "../../../assets/image/ape.webp";
import Icons from "../asset/Icon.js";
import { Pressable, Dimensions, SegmentedControlIOSComponent } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../component/Header";
import ShelvesModal from "./ShelvesModal";
import { useEffect } from "react";

const { width } = Dimensions.get("window");

const list = [];
const keys = [...new Array(40).keys()];
keys.forEach((item, indx) => {
  list.push({
    id: indx,
    selected: false,
    title: "水晶球",
    price: 14,
    number: 12233333444,
  });
});

//选中的NFT
let selectedList = [];
const listSet = new Set();

const ShelvesPage = props => {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [listArray, setListArray] = useState([...list]);
  const [btnState, setBtnState] = useState(false);
  const setStepCallBack = payload => {
    setStep(payload);
  };
  

  const nextStepClickHandler = props => {
    setShow(true);
  };

  useEffect(() => {
    if (listArray.some(item => item.selected === true)) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
    console.log("listarray change");
  }, [listArray]);
  return (
    <>
      <VStack>
        <ShelvesModal selectedList={selectedList} show={show} close={()=> setShow(false)} />
        <Header>上架</Header>
        <VStack h="82%" pl="4px" pt="8" pb="8" pr="2px">
          <StepOne listArray={listArray} setListArray={setListArray} show={modalVisible} close={setModalVisible} />
        </VStack>
        <VStack h="15%" padding="8" pt="4" justifyContent="center">
          {btnState ? (
            <Button
              bg="#1296db"
              w="100%"
              onPress={() => {
                nextStepClickHandler();
              }}
            >
              下一步
            </Button>
          ) : (
            <Button bg="#1296db" w="100%" isDisabled>
              下一步
            </Button>
          )}
        </VStack>
      </VStack>
    </>
  );
};

const StepOne = props => {
  const { show, close } = props;
  const { listArray, setListArray } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const navigation = useNavigation();
  console.log(listArray,"listArray");
  const handleSetTabIndex = payload => {
    setTabIndex(payload);
  };
  const selectItem = props => {
    // setShow(!show)
    const { item } = props;
    setIsOpen(true);
    setListArray(prelist => {
      for (let i = 0; i < prelist.length; i++) {
        if (prelist[i]["id"] === item.id) {
          prelist[i]["selected"] = !item.selected;
          break;
        }
      }
      console.log(prelist, "prelist");
      return [...prelist];
    });

    if (listSet.has(item.id)) {
      //在选中的list中，就删掉，
      listSet.delete(item.id);
      selectedList = selectedList.filter(i => i.id !== item.id);
    } else {
      // 不在选中list中，就加上
      listSet.add(item.id);
      selectedList.push(item);
    }

    console.log(selectedList, "selectedList");
  };

  //上链弹窗 TODO
  const goToPage = props => {
    setIsOpen(false);
    // navigation.navigate('', {})
  };
  const sellParent = payload => {
    console.log(payload, "sell parent");
  };

  const sellSelf = payload => {
    console.log(payload, "sell self");
  };
  return (
    <VStack>
      <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} goToPage={goToPage} />
      <HStack>
        <Tabs tabIndex={tabIndex} setTabIndex={handleSetTabIndex}></Tabs>
      </HStack>
      <ScrollView mt="4">
        <HStack flexWrap="wrap" justifyContent='space-between'>
          {listArray.map((item, index) => {
            return (
              <Box mt="4" position="relative" overflow="hidden" key={index}>
                <Pressable onPress={() => selectItem({ item })}>
                  <Image alt="img" borderRadius="80" w='160px' h='160px' source={ape} />
                </Pressable>
                <PresenceTransition
                  visible={item.selected}
                  initial={{
                    opacity: 0,
                    translateX: 20,
                  }}
                  animate={{
                    opacity: 1,
                    translateX: 0,
                    transition: {
                      duration: 150,
                    },
                  }}
                >
                  <HStack w="100%" justifyContent="center" position="absolute" zIndex="10" bottom="2" right="0">
                    <Pressable onPress={() => sellParent(item)}>
                      <Box {...styles.parent} _text={{ color: "white", textAlign: "center" }}>
                        父
                      </Box>
                    </Pressable>
                    <Pressable onPress={() => sellSelf(item)}>
                      <Box {...styles.parent} bg="#d81e06" _text={{ color: "white", textAlign: "center" }}>
                        售
                      </Box>
                    </Pressable>
                    <Box {...styles.parent} bg="#8a8a8a" _text={{ color: "white", textAlign: "center" }}></Box>
                  </HStack>
                </PresenceTransition>
              </Box>
            );
          })}
        </HStack>
      </ScrollView>
    </VStack>
  );
};

const ConfirmModal = props => {
  const { isOpen, setIsOpen, goToPage } = props;
  // const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content w='80%'>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>
          <Center>
            <Text fontSize="20px">信息提示</Text>
          </Center>
        </AlertDialog.Header>
        <AlertDialog.Body>
          <Center>
            <Text>您还有印记未上链，上否前往上链</Text>
            <Text mt="2" color="#d81e06">
              (特殊印记会更有收藏价值哦)
            </Text>
          </Center>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <HStack justifyContent="space-around" alignItems="center" space={8} pr="2">
            <Button {...styles.btn} bg="#d81e06" onPress={() => setIsOpen(false)}>
              拒绝
            </Button>
            <Button {...styles.btn} bg="#1296db" onPress={() => goToPage()}>
              前往
            </Button>
          </HStack>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
const Tabs = props => {
  const tabArr = ["NFTS", "地产"];
  const { tabIndex, setTabIndex } = props;
  return (
    <Center>
      <HStack>
        <FlatList
          horizontal={true}
          data={tabArr}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  setTabIndex(index);
                }}
                borderColor="darkBlue.400"
                // borderBottomWidth="2"
                bg={index == tabIndex ? "darkBlue.400" : null}
              >
                <HStack
                  h="10"
                  padding="3"
                  borderBottomWidth="1px"
                  borderColor="#1296db"
                  borderTopRightRadius="4"
                  borderTopLeftRadius="4"
                  style={{ backgroundColor: index === tabIndex ? "#1296db" : "#eaf3e6" }}
                  alignItems="center"
                  justifyContent="center"
                  key={index}
                >
                  <Text style={{ color: index === tabIndex ? "white" : "#515151" }} textAlign="center">
                    {item}
                  </Text>
                </HStack>
              </Pressable>
            );
          }}
        ></FlatList>
      </HStack>
    </Center>
  );
};

export default React.memo(ShelvesPage);

const styles = {
  parent: {
    backgroundColor: "#33ddfa",
    padding: "1px",
    width: "28px",
    height: "28px",
    borderRadius: 28,
  },
  btn: {
    paddingLeft: "18%",
    paddingRight: "18%",
    borderRadius: "40px",
  },
};
