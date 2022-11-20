import React from "react";
import { PresenceTransition, VStack, Text, HStack } from "native-base";
import { pxToDp } from "../../utils/stylesKits";
import Button from "./Button";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import { ImageBackground } from "react-native";
import breedResult from "@/../../assets/image/UiImg/breedResult.webp";
import aidaTip from "@/../../assets/image/UiImg/aidaTip.webp";
const FreeAidaModal = props => {
  const { show, resultBall, goToSonAIDA } = props;
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
      zIndex="9999"
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
              {/* <CrystalBallComponent type="primary" width={pxToDp(410)} height={pxToDp(424)} gene={resultBall.gene} /> */}
              <HStack mb={pxToDp(30)} borderRadius={pxToDp(27)} justifyContent="center" w={pxToDp(370)} h={pxToDp(53)}>
                <ImageBackground style={{ width: pxToDp(381), height: pxToDp(54) }} source={aidaTip}>
                  <Text color="white" textAlign="center">
                    AIDA-{resultBall?.ballid}
                  </Text>
                </ImageBackground>
              </HStack>
            </VStack>
            <Text  w={pxToDp(687)} textAlign="center" mt={pxToDp(83)} fontSize={pxToDp(42)}>
              Congratulations on AIDA three-day free experience.
            </Text>
          </VStack>

          {/* <Button
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
          </Button> */}
        </VStack>
      </PresenceTransition>
    </VStack>
  );
};

export default React.memo(FreeAidaModal);
