import React, { useState, useEffect } from "react";
import {
  Modal,
  Text,
  VStack,
  HStack,
  Radio,
  Divider,
  Pressable,
  Image,
  PresenceTransition,
  FormControl,
  Box,
} from "native-base";
import TipPop from "./TipPop";
import Icons from "../asset/Icon";
import { assign } from "lodash";
import { handleFetchTransactionGas } from "../api/service/index";
import global from "../api/util/global";
import Button from "./Button";
import { pxToDp } from "../../utils/stylesKits";
import Input from "./Input";
const lvlTextArray = ["Low", "Market", "Aggresive"];

const RadioSelect = props => {
  const { lvlValue, handleSetDefaultPriority } = props;
  return (
    <VStack w="100%" mt="4" justifyContent="center">
      <Radio.Group
        name="lel"
        value={lvlValue}
        onChange={e => {
          handleSetDefaultPriority(e);
        }}
      >
        <HStack w="80%" ml="10%" justifyContent="space-between">
          <HStack alignItems="center" justifyContent="center" position="relative">
            <Image
              position="absolute"
              w={pxToDp(61)}
              h={pxToDp(61)}
              key={lvlValue == 0}
              source={lvlValue == 0 ? Icons.radioCIcon : Icons.radioIcon}
            ></Image>
            <Radio opacity={0} colorScheme="blue" size="sm" value={0}></Radio>
          </HStack>
          <HStack alignItems="center" justifyContent="center" position="relative">
            <Image
              position="absolute"
              w={pxToDp(61)}
              h={pxToDp(61)}
              key={lvlValue == 1}
              source={lvlValue == 1 ? Icons.radioCIcon : Icons.radioIcon}
            ></Image>
            <Radio opacity={0} colorScheme="blue" size="sm" value={1}></Radio>
          </HStack>
          <HStack alignItems="center" justifyContent="center" position="relative">
            <Image
              position="absolute"
              w={pxToDp(61)}
              h={pxToDp(61)}
              key={lvlValue == 2}
              source={lvlValue == 2 ? Icons.radioCIcon : Icons.radioIcon}
            ></Image>
            <Radio opacity={0} colorScheme="blue" size="sm" value={2}></Radio>
          </HStack>
        </HStack>
      </Radio.Group>

      <VStack mt="1" alignItems="center">
        <>
          <HStack h="2" w="80%" justifyContent="space-between">
            <Divider w={pxToDp(5)} thickness="1" mx="2" orientation="vertical" />
            <Divider w={pxToDp(5)} thickness="1" mx="2" orientation="vertical" />
            <Divider w={pxToDp(5)} thickness="1" mx="2" orientation="vertical" />
          </HStack>
          <Divider w="75.5%" h={pxToDp(5)}></Divider>
        </>

        <HStack mt="1" w="110%" justifyContent="space-between">
          {lvlTextArray.map((item, index) => {
            return (
              <Text w="33.333%" textAlign="center" key={index} color={index == lvlValue ? "black" : "rgb(155,155,155)"}>
                {item}
              </Text>
            );
          })}
        </HStack>
      </VStack>
    </VStack>
  );
};

const PriorityEdit = props => {
  const { show, close, payload, priority, setPriority, setGasLimit } = props;
  const [lvlValue, setLvlValue] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [editObj, setEditObj] = useState({});
  const [priorityTable, setPriorityTable] = useState([]);
  const [editLimit, setEditLimit] = useState(null);
  const handleInputLimit = payload => {
    // setEditObj(assign(editObj, { gasLimit: payload }));
    setEditLimit(payload);
  };
  const handleInputMaxPriorityFeePerGas = payload => {
    setEditObj(assign(editObj, { maxPriorityFee: payload }));
  };
  const handleInputMaxFeePerGas = payload => {
    setEditObj(assign(editObj, { maxFee: payload }));
  };
  const handleSetDefaultPriority = payload => {
    setLvlValue(payload);
    setEditObj(priorityTable[payload]);
  };
  const getData = async () => {
    const res = await handleFetchTransactionGas(global.defaultNetwork.ChainId);
    const {
      data: { MaxPriorityFeePerGas, MaxFeePerGas },
    } = res;

    const priorityArray = [
      { MaxPriorityFeePerGas: 0.5 * MaxPriorityFeePerGas, maxFee: MaxFeePerGas },
      { MaxPriorityFeePerGas, maxFee: MaxFeePerGas },
      { MaxPriorityFeePerGas: 1.5 * MaxPriorityFeePerGas, maxFee: MaxFeePerGas },
    ];
    setPriorityTable(priorityArray);
    setEditObj(priorityArray[lvlValue]);
  };

  useEffect(() => {
    getData();
    return () => {};
  }, [show]);
  return (
    <Modal
      isOpen={show}
      onClose={() => {
        close(false);
      }}
    >
      <VStack w={pxToDp(921)} bg="white" borderRadius={pxToDp(59)}>
        <VStack alignItems="center" justifyContent="space-between">
          <VStack alignItems="center" w="100%">
            <HStack mt={pxToDp(33)} alignItems="center" justifyContent="space-between" w="100%">
              <Box w="33.333%"></Box>
              <Text fontSize={pxToDp(54)} fontWeight="800" textAlign="center" w="33.333%">
                Edit priority
              </Text>
              <Pressable onPress={() => close(false)} w="33.333%" alignItems="flex-end">
                <Image mr={pxToDp(47)} w={pxToDp(38)} h={pxToDp(38)} source={Icons.closeIcon} />
              </Pressable>
            </HStack>

            <VStack mt={pxToDp(11)} alignItems="center">
              <HStack>
                <Text fontWeight="800" fontSize={pxToDp(70)}>
                  ~{payload?.value}
                </Text>
                <Text fontWeight="800" fontSize={pxToDp(70)}>
                  {payload?.name}
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold" fontSize={pxToDp(35)}>
                  Maximum cost：
                </Text>
                <Text fontWeight="bold" fontSize={pxToDp(35)}>
                  {editObj.MaxPriorityFeePerGas + editObj.maxFee}
                  GWei
                </Text>
              </HStack>
              <Text mt={pxToDp(17)} fontWeight="bold" fontSize={pxToDp(41)} color="#14B05A">
                {`Probably in<${lvlValue == 0 ? "120" : lvlValue == 1 ? "60" : "30"}seconds`}
              </Text>
            </VStack>
            <RadioSelect
              showDetail={showDetail}
              lvlValue={lvlValue}
              handleSetDefaultPriority={handleSetDefaultPriority}
            ></RadioSelect>
            <VStack mt={pxToDp(23)} w="100%">
              <Pressable
                onPress={() => {
                  setShowDetail(!showDetail);
                }}
                mb={pxToDp(77)}
              >
                <HStack justifyContent="center" alignItems="center">
                  <Text fontSize={pxToDp(41)} fontWeight="bold" color="#5C50D2">
                    Advanced options
                  </Text>
                  <Image alt="img" w={pxToDp(28)} h={pxToDp(17)} key={showDetail} source={Icons.arrowDownPIcon}></Image>
                </HStack>
              </Pressable>
              {showDetail ? (
                <PresenceTransition
                  // style={{ width: "100%" }}
                  visible={showDetail}
                  initial={{
                    opacity: 0,
                    translateY: 20,
                  }}
                  animate={{
                    opacity: 1,
                    translateY: -20,
                    transition: {
                      duration: 250,
                    },
                  }}
                >
                  <FormControl>
                    <VStack mx="4">
                      <FormControl.Label>
                        <TipPop
                          render={
                            <HStack alignItems="center">
                              <Text color="#181818" fontSize={pxToDp(35)} fontWeight="bold">
                                Fuel restriction
                              </Text>
                              <Image ml="1" alt="img" size="4" source={Icons.tipIcon}></Image>
                            </HStack>
                          }
                          des={"这是一段描述"}
                        ></TipPop>
                      </FormControl.Label>
                      <Input
                        onChangeText={e => {
                          handleInputLimit(e);
                        }}
                        type="number"
                      />
                    </VStack>
                    <VStack mx="4">
                      <FormControl.Label>
                        <TipPop
                          render={
                            <HStack alignItems="center">
                              <Text color="#181818" fontSize={pxToDp(35)} fontWeight="bold">
                                Maximum priority cost
                              </Text>
                              <Image ml="1" alt="img" size="4" source={Icons.tipIcon}></Image>
                            </HStack>
                          }
                          des={"这是一段描述"}
                        ></TipPop>
                      </FormControl.Label>
                      <Input
                        onChangeText={e => {
                          handleInputMaxPriorityFeePerGas(e);
                        }}
                        type="number"
                      />
                    </VStack>
                    <VStack mx="4">
                      <FormControl.Label>
                        <TipPop
                          render={
                            <HStack alignItems="center">
                              <Text color="#181818" fontSize={pxToDp(35)} fontWeight="bold">
                                Maximum cost
                              </Text>
                              <Image ml="1" alt="img" size="4" source={Icons.tipIcon}></Image>
                            </HStack>
                          }
                          des={"这是一段描述"}
                        ></TipPop>
                      </FormControl.Label>
                      <Input
                        onChangeText={e => {
                          handleInputMaxFeePerGas(e);
                        }}
                        type="number"
                      />
                    </VStack>
                  </FormControl>
                </PresenceTransition>
              ) : null}
            </VStack>
          </VStack>
          <VStack alignItems="center" mb={pxToDp(33)}>
            <Pressable alignItems="center" justifyContent="center">
              <TipPop
                render={
                  <HStack>
                    <Text fontSize={pxToDp(41)} color="#5C50D2">
                      How should I choose?
                    </Text>
                  </HStack>
                }
                des={"这是一段描述"}
              ></TipPop>
            </Pressable>
            <Button
              mt={pxToDp(23)}
              type="lg"
              onPress={() => {
                setPriority(editObj);
                if (!editLimit) {
                  setGasLimit(editLimit);
                }
                close(false);
              }}
            >
              Save
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default React.memo(PriorityEdit);
