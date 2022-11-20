import React from "react";
import { HStack } from "native-base";
import shadowCon from "@/../../assets/image/UiImg//shadowCon.webp";
import { ImageBackground } from "react-native";
import { pxToDp } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import CrystalBallGene from "../Crystalball/CrystalBallGene";

const Compose = (props) => {
  const { detailsItem } = props;
  if (!detailsItem) {
    return null;
  }
  return (
    <ImageBackground
      style={{
        width: pxToDp(603),
        height: pxToDp(273),
        // marginRight: pxToDp(-30),
      }}
      resizeMethod="resize"
      resizeMode="stretch"
      source={shadowCon}
    >
      <HStack w="100%" h="100%" pt={pxToDp(36)} pl={pxToDp(44)} flexWrap="wrap">
        <CrystalBallGene
          type="primary"
          geneRender
          width={77}
          height={77}
          gene={detailsItem?.gene}
        ></CrystalBallGene>
      </HStack>
    </ImageBackground>
  );
};
export default React.memo(Compose);
