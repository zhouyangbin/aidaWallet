import React, { useEffect, useState } from "react";
import { PresenceTransition, VStack, Text, HStack } from "native-base";
import { pxToDp } from "../../../utils/stylesKits";
import Button from "../../component/Button";
import CrystalBallComponent from "../Crystalball";
import { ImageBackground } from "react-native";
import breedResult from "@/../../assets/image/UiImg/breedResult.webp";
import aidaTip from "@/../../assets/image/UiImg/aidaTip.webp";
import { Crystalball } from "../../api/web3/Crystalball";
import config from "../../api/util/config";
import global from "../../api/util/global";

const handleSearchBall = async (ballid, setBall) => {
  const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
  const ballProperty = await crystalballInstance.getCrystalballProperty(ballid);
  setBall(ballProperty);
};
const ResultBox = props => {
  const { show, resultBall, goToSonAIDA } = props;
  const [ball, setBall] = useState({});
  useEffect(() => {
    handleSearchBall(resultBall.ballid, setBall);
    return () => {
      setBall({});
    };
  }, [resultBall]);

  return (
    <VStack
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      top="0"
      left="0"
      bg={"rgba(0,0,0,0.7)"}
    >
      <PresenceTransition
        visible={show}
        initial={{
          opacity: 0,
          translateY: 30,
        }}
        animate={{
          opacity: 1,
          translateY: 0,

          transition: {
            duration: 250,
          },
        }}
      >
        <VStack w={pxToDp(960)} h={pxToDp(1535)} alignItems="center">
          <ImageBackground
            source={breedResult}
            style={{ position: "absolute", top: 0, width: pxToDp(959), height: pxToDp(1535) }}
          ></ImageBackground>
          <VStack mt={pxToDp(210)} alignItems="center">
            <Text color="white" fontWeight="800" fontSize={pxToDp(50)}>
              Congratulations
            </Text>
            <Text color="white" fontWeight="800" fontSize={pxToDp(50)}>
              Get AIDA
            </Text>
          </VStack>
          <VStack alignItems="center" mt={pxToDp(193)}>
            <VStack
              pt={pxToDp(21)}
              justifyContent="space-between"
              alignItems="center"
              w={pxToDp(442)}
              h={pxToDp(570)}
              borderRadius={pxToDp(30)}
              bg="#F1F0FF"
            >
              {ball.gene ? (
                <CrystalBallComponent type="primary" width={pxToDp(410)} height={pxToDp(424)} gene={ball?.gene} />
              ) : (
                <HStack w={pxToDp(410)} h={pxToDp(424)}></HStack>
              )}
              <HStack mb={pxToDp(30)} borderRadius={pxToDp(27)} justifyContent="center" w={pxToDp(370)} h={pxToDp(53)}>
                <ImageBackground style={{ width: pxToDp(381), height: pxToDp(53) }} source={aidaTip}>
                  <Text color="white" textAlign="center" lineHeight={pxToDp(53)} h={pxToDp(53)}>
                    AIDA-{ball?.ballid}
                  </Text>
                </ImageBackground>
              </HStack>
            </VStack>
            <Text mt={pxToDp(34)} fontSize={pxToDp(60)} color="#14CA54">
              Breeding completed
            </Text>
          </VStack>

          <Button
            mt={pxToDp(80)}
            type="lg"
            onPress={() => {
              goToSonAIDA();
              // initCrystalballData();
              // setResultShow(false);
              // close(false);
              // setShowDetail(false)
            }}
          >
            Enter AIDA backpack
          </Button>
        </VStack>
      </PresenceTransition>
    </VStack>
  );
};

export default React.memo(ResultBox);
