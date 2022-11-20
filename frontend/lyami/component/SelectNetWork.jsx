import React, { useContext } from "react";
import { Modal, FlatList, HStack, VStack, Image, Text, Pressable } from "native-base";
import Button from "./Button";
import { pxToDp } from "../../utils/stylesKits";
import Icons from "../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { useGlobalStore } from "../api/Store/globalHook";
import LoadingContext from "../../providers/LoadContext";

const SelectNetWork = props => {
  const { show, setModalShow } = props;
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const navigation = useNavigation();
  const loading = useContext(LoadingContext);
  return (
    <Modal
      isOpen={show}
      onClose={() => {
        setModalShow(false);
      }}
    >
      <VStack w={pxToDp(922)} h={pxToDp(800, "h")} bg="white" alignItems="center" borderRadius={pxToDp(60)}>
        <HStack h={pxToDp(110)} alignItems="center" w="100%" justifyContent="space-between">
          <HStack w="33%"></HStack>
          <HStack justifyContent="center" alignItems="center" w="33%">
            <Text fontSize={pxToDp(55)} fontWeight="800">
              Network
            </Text>
          </HStack>
          <HStack justifyContent="flex-end" w="33%">
            <Pressable
              onPress={() => {
                setModalShow(false);
              }}
              w={pxToDp(39)}
              mr={pxToDp(53)}
            >
              <Image w={pxToDp(39)} h={pxToDp(39)} source={Icons.closeIcon}></Image>
            </Pressable>
          </HStack>
        </HStack>
        <VStack w={pxToDp(847)} flex="1">
          <FlatList
            data={globalData.nativeCoinNetwork}
            renderItem={({ item, index }) => {
              return (
                <>
                  {[1, 137, 80001].includes(item.ChainId) ? (
                    <Pressable
                      w="100%"
                      alignItems="center"
                      key={index}
                      h={pxToDp(171)}
                      borderBottomWidth={index != globalData.nativeCoinNetwork.length - 1 ? pxToDp(2) : 0}
                      borderColor="#E0E0E0"
                      flexDirection="row"
                      onPress={() => {
                        handleSetGlobalData({ ...globalData, defaultNetwork: item, assetsLoaded: false });
                        setModalShow(false);
                      }}
                    >
                      {item.ChainId == globalData.defaultNetwork.ChainId ? (
                        <Image
                          ml={pxToDp(25)}
                          mr={pxToDp(45)}
                          w={pxToDp(49)}
                          h={pxToDp(41)}
                          key={globalData.defaultNetwork.ChainId}
                          source={Icons.currentIcon}
                        ></Image>
                      ) : (
                        <Image
                          ml={pxToDp(25)}
                          mr={pxToDp(45)}
                          w={pxToDp(71)}
                          h={pxToDp(71)}
                          key={globalData.defaultNetwork.ChainId}
                          source={Icons.bnbIcon}
                        ></Image>
                      )}

                      <Text fontSize={pxToDp(42)}>{item.name}</Text>
                    </Pressable>
                  ) : null}
                </>
              );
            }}
          ></FlatList>
        </VStack>
        <Button
          onPress={() => {
            navigation.navigate("AddNetWork", {});
            setModalShow(false);
            loading.hideMenu();
          }}
          mb={pxToDp(31)}
          type="lg"
        >
          Add network
        </Button>
      </VStack>
    </Modal>
  );
};

export default React.memo(SelectNetWork);
