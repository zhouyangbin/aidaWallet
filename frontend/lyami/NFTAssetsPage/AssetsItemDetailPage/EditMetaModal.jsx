import React, { useState, useEffect } from "react";
import { VStack, Modal, Text, HStack, Actionsheet, Pressable } from "native-base";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { pxToDp } from "../../../utils/stylesKits";
import global from "../../api/util/global";
import { ipfs, add, addJSON } from "../ipfsClient";
import { assign } from "lodash";
import { Crystalball } from "../../api/web3/Crystalball";
import { handleFetchTransactionGas } from "../../api/service/index";
import config from "../../api/util/config";
import {I18n} from "../../../language/I18n"

const typeArray = ["Html", "Video", "Image"];
const handleSaveMeta = async (
  payload,
  crystalballInstance,
  setGasLimit,
  setMetaUrl,
  ballid,
  setIsLoading,
  setIsAdded
) => {
  const author = global.defaultAddress.call();
  const createTime = new Date().valueOf();
  assign(payload, { author, createTime, aida: ballid });
  //   const
  setIsLoading(true);
  try {
    const res = await addJSON(payload);
    setMetaUrl(res);
    setIsAdded(true);
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    console.log(error);
  }
};
const handleMint = async (crystalballInstance, ballid, metaUrl, priority, setIsLoading, close) => {
  setIsLoading(true);
  try {
    const gas = await crystalballInstance.mintCrystalBallMeta(ballid, `ipfs://${metaUrl}`);
    const res = await crystalballInstance.mintCrystalBallMeta(
      ballid,
      `ipfs://${metaUrl}`,
      gas,
      priority.MaxPriorityFee * 10 ** 9
    );
    setIsLoading(false);
    close(false);
    console.log(res);
  } catch (error) {
    setIsLoading(false);
    console.log(error);
  }
};

const InputComponent = props => {
  const { handler, title, type } = props;

  return (
    <VStack w={pxToDp(858)}>
      <Text h={pxToDp(73)} fontSize={pxToDp(37)}>
        {title}
      </Text>
      {title == "Type" ? (
        <Pressable onPress={() => handler(true)}>
          <Text
            lineHeight={pxToDp(111)}
            borderColor="#AFBAC5"
            borderRadius={pxToDp(19)}
            borderWidth={pxToDp(2)}
            h={pxToDp(111)}
            fontSize={pxToDp(36)}
            pl={pxToDp(23)}
          >
            {type}
          </Text>
        </Pressable>
      ) : (
        <Input
          onChangeText={e => {
            handler(e);
          }}
        ></Input>
      )}
    </VStack>
  );
};
const handleGetServerGasFee = async (setPriority, setGasLimit) => {
  const res = await handleFetchTransactionGas(global.defaultNetwork.ChainId);
  const {
    data: { MaxPriorityFeePerGas, MaxFeePerGas, GasLimit },
  } = res;
  setGasLimit(GasLimit);
  setPriority({ MaxPriorityFeePerGas, maxFee: MaxFeePerGas });
};
const EditMetaModal = props => {
  const { show, close, ballid } = props;
  const [typeShow, setTypeShow] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gasLimit, setGasLimit] = useState(null);
  const [priority, setPriority] = useState(null);
  const [metaUrl, setMetaUrl] = useState(null);
  const [type, setType] = useState("html");
  const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
  useEffect(() => {
    handleGetServerGasFee(setPriority, setGasLimit);
    return () => {
      setIsAdded(false);
    };
  }, [show]);

  return (
    <Modal isOpen={show} onClose={() => close(false)}>
      <Modal.Content py={pxToDp(31)} w={pxToDp(922)} alignItems="center">
        <HStack>
          <Text fontWeight="800" fontSize={pxToDp(47)}>
            {I18n.t("aida.addMeta")}
          </Text>
        </HStack>
        {/* <InputComponent title="type"></InputComponent> */}
        <InputComponent handler={setTitle} title={I18n.t("aida.title")}></InputComponent>
        <InputComponent handler={setDescription} title={I18n.t("aida.description")}></InputComponent>
        <InputComponent handler={setImage} title={I18n.t("aida.image")}></InputComponent>
        <InputComponent handler={setUrl} title={I18n.t("aida.url")}></InputComponent>
        <InputComponent handler={setTypeShow} type={type} title={I18n.t("aida.type")}></InputComponent>
        <Button
          isLoading={isLoading}
          onPress={() => {
            isAdded
              ? handleMint(crystalballInstance, ballid, metaUrl, priority, setIsLoading, close)
              : handleSaveMeta(
                  { title, description, image, url, type },
                  crystalballInstance,
                  setGasLimit,
                  setMetaUrl,
                  ballid,
                  setIsLoading,
                  setIsAdded
                );
          }}
          mt={pxToDp(23)}
          type="lg"
        >
          {isAdded ? I18n.t("aida.type") : I18n.t("aida.save")}
        </Button>
      </Modal.Content>
      {typeShow ? (
        <Actionsheet isOpen={typeShow} onClose={() => setTypeShow(false)}>
          <Actionsheet.Content>
            {typeArray.map((item, index) => {
              return (
                <Actionsheet.Item
                  key={index}
                  onPress={() => {
                    setType(item);
                    setTypeShow(false);
                  }}
                >
                  <Text>{item}</Text>
                </Actionsheet.Item>
              );
            })}
          </Actionsheet.Content>
        </Actionsheet>
      ) : null}
    </Modal>
  );
};

export default React.memo(EditMetaModal);
