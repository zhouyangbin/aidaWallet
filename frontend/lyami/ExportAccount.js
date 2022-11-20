import React, { useEffect, useState } from "react";
import { Text, Image, HStack, Pressable, Box, Checkbox, VStack, FlatList, Actionsheet, useToast } from "native-base";
import { cloneDeep } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { pxToDp } from "../utils/stylesKits";
import Button from "./component/Button";
import CrystalBallComponent from "./NFTAssetsPage/Crystalball";
import Icons from "./asset/Icon";
import RNFS from "react-native-fs";
import { lyamiEncrypt } from "./api/util/crypto";
import { useGlobalStore } from "./api/Store/globalHook";

const ExportAccount = props => {
  const navigation = useNavigation();
  const [allChecked, setAllChecked] = useState(false);
  const [typeSelectShow, setTypeSelectShow] = useState(false);
  const [selectValue, setSelectValue] = useState("PrivateKey");
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const [userList, setUserList] = useState(globalData.keys);
  const toast = useToast();
  const changeChecked = (key, checked) => {
    setUserList(userData => {
      userData.forEach(item => {
        if (item.privateKey === key) {
          if (checked === "press") {
            setAllChecked(false);
            item.checked = !item.checked;
          } else {
            item.checked = checked;
          }
        }
      });
      return [...userData];
    });
  };
  const changeCheckedAll = checked => {
    const data = cloneDeep(userList);
    const userData = data.map(item => {
      item.checked = checked;
      return item;
    });
    setAllChecked(checked);
    setUserList(userData);
  };
  const handleSaveJson = async payload => {
    try {
      let text = await lyamiEncrypt(globalData.CreateNewPassword, payload.privateKey);
      RNFS.writeFile(
        RNFS.DocumentDirectoryPath +
          `/${payload.address.substring(payload.address.length - 8, payload.address.length)}.json`,
        text,
        "utf8"
      )
        .then(success => {
          //   toast.show({ description: "success", placement: "top", duration: 1500 });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleExport = () => {
    if (selectValue === "PrivateKey") {
      return navigation.navigate("ExportResult", { userList: userList.filter(item => item.checked) });
    } else {
      for (let i = 0; i < userList.length; i++) {
        userList[i].checked ? handleSaveJson(userList[i]) : null;
      }
      toast.show({ description: "success", placement: "top", duration: 1500 });
    }
  };
  return (
    <VStack w="100%" h="100%" bg="#E8EDFF">
      <VStack h={pxToDp(649)} W="100%" px={pxToDp(41)}>
        <HStack mt={pxToDp(75)} width="100%" justifyContent="space-between" alignItems="flex-end">
          <Pressable w="80%"></Pressable>
          <Pressable
            alignItems="flex-end"
            justifyContent="center"
            flex="1"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image alt="img" w={pxToDp(39)} h={pxToDp(39)} source={Icons.closeIcon}></Image>
          </Pressable>
        </HStack>
        <HStack mb={pxToDp(109)} alignItems="flex-start">
          <Image alt="img" source={Icons.exportIcon} w={pxToDp(93)} h={pxToDp(107)}></Image>
          <Text ml={pxToDp(37)} fontSize={pxToDp(69)} fontWeight="bold">
            Export account
          </Text>
        </HStack>

        <Text fontSize={pxToDp(35)} fontWeight="normal">
          The Export account can be viewed in your wallet, but it can't be retrieved through the mnemonic of Leyami
          wallet.
        </Text>
        <Text mt={pxToDp(69)} fontSize={pxToDp(41)} fontWeight="800">
          Learn more about the imported accounts here.
        </Text>
      </VStack>
      <VStack
        px={pxToDp(43)}
        w="100%"
        flex="1"
        bg="white"
        justifyContent="space-between"
        borderTopLeftRadius={pxToDp(79)}
        borderTopRightRadius={pxToDp(79)}
      >
        <HStack pt={pxToDp(59)} mb={pxToDp(26)}>
          <Text mr={pxToDp(25)} fontSize={pxToDp(35)} fontWeight="800">
            Export mode
          </Text>
          <Pressable
            w={pxToDp(377)}
            h={pxToDp(69)}
            bg="#EDF0F4"
            borderWidth={0}
            fontSize={pxToDp(31)}
            borderRadius={pxToDp(35)}
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
            onPress={() => setTypeSelectShow(true)}
          >
            <Text fontSize={pxToDp(37)} ml={pxToDp(39)}>
              {selectValue}
            </Text>
            <Image mr={pxToDp(33)} w={pxToDp(29)} h={pxToDp(19)} source={Icons.arrowDownIcon}></Image>
          </Pressable>
        </HStack>
        <FlatList
          bg="#ECF0F3"
          borderRadius={pxToDp(29)}
          p={pxToDp(19)}
          data={userList}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item, index }) => {
            console.log(item);
            return (
              <Pressable
                w="100%"
                bg="white"
                h={pxToDp(171)}
                justifyContent="center"
                alignItems="center"
                borderRadius={pxToDp(21)}
                mb={pxToDp(19)}
                onPress={() => {
                  changeChecked(item.privateKey, "press");
                }}
              >
                <HStack w="100%" alignItems="center">
                  <Box alignItems="center" mr={pxToDp(21)} ml={pxToDp(31)} position="relative" justifyContent="center">
                    <Checkbox
                      opacity={0}
                      value={item.checked}
                      key={item.privateKey}
                      isChecked={item.checked}
                      onChange={checked => changeChecked(item.privateKey, checked)}
                      borderRadius="100"
                    ></Checkbox>
                    <Image
                      key={item.checked}
                      position="absolute"
                      w={pxToDp(39)}
                      h={pxToDp(39)}
                      source={item.checked ? Icons.selectPIcon : Icons.notSelectIcon}
                    ></Image>
                  </Box>
                  <CrystalBallComponent
                    type="primary"
                    width={pxToDp(139)}
                    height={pxToDp(139)}
                    gene={item.address.slice(2, 38)}
                  ></CrystalBallComponent>
                  <Text fontSize={pxToDp(45)} fontWeight="bold" ml={pxToDp(25)}>
                    {`${item.address.substring(0, 10)}...${item.address.substring(
                      item.address.length - 10,
                      item.address.length
                    )}`}
                  </Text>
                </HStack>
              </Pressable>
            );
          }}
        ></FlatList>
        <VStack mt={pxToDp(47)} alignItems="center" w="100%" mb={pxToDp(65)}>
          <Pressable
            mb={pxToDp(47)}
            flexDirection="row"
            onPress={() => changeCheckedAll(!allChecked)}
            w="100%"
            alignItems="center"
          >
            <Image
              key={allChecked}
              w={pxToDp(39)}
              h={pxToDp(39)}
              source={allChecked ? Icons.selectPIcon : Icons.notSelectIcon}
              mr={pxToDp(21)}
            ></Image>
            <Text fontSize={pxToDp(35)}>Select All</Text>
          </Pressable>
          <Button
            type="lg"
            onPress={() => handleExport()}
            disabled={!userList.some(opt => opt.checked)}
            bg={!userList.some(opt => opt.checked) ? "#eee" : "#5C50D2"}
          >
            One click Export
          </Button>
        </VStack>
      </VStack>
      <Actionsheet isOpen={typeSelectShow} onClose={() => setTypeSelectShow(false)}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => {
              setSelectValue("PrivateKey");
              setTypeSelectShow(false);
            }}
          >
            <Text>PrivateKey</Text>
          </Actionsheet.Item>
          {/* <Actionsheet.Item
            onPress={() => {
              setSelectValue("Json");
              setTypeSelectShow(false);
            }}
          >
            <Text>Json</Text>
          </Actionsheet.Item> */}
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
};

export default ExportAccount;
