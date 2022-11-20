import React, { useState, useEffect, useRef,useCallback } from "react";
import { StyleSheet } from "react-native";
import { Image, VStack } from "native-base";
// import { Canvas, Image, useImage, Fill,  } from "@shopify/react-native-skia";
import CrystalGeneConfig from "./CrystalList.json";
import CrystalGeneType from "./GeneticType.json";
import GeneIcon from "../../asset/CrystalBallIcon";
// import { pxToDp } from "../../../utils/stylesKits";
import ViewShot from "react-native-view-shot";

/**
 * 从资源文件中寻找基因对应的资源
 * @param {number} pos 位置
 * @param {string} gene 基因编码
 * @returns
 */
const findGeneResource = (pos, gene) => {
  const find = CrystalGeneConfig.find(x => x.GeneticType == pos && x.GeneticID.toLowerCase() == gene.toLowerCase());
  return find;
};

/**
 * 分割基因片段
 * @param {string} gene 基因片段
 * @returns
 */
const splitGenePos = gene => {
  let result = [];
  const splitLength = 4;
  for (let i = 0; i < gene.length; i += splitLength) {
    const posIndex = i / splitLength + 1;
    const layerTable = CrystalGeneType.find(x => x.type == posIndex);
    if (layerTable == null) continue;
    const geneChar = gene[i];
    result.push({
      pos: posIndex,
      gene: geneChar,
      layer: layerTable.CombinLayer,
    });
  }
  return result.sort((a, b) => b.layer - a.layer);
};

/**
 * 取得某个基因对应的图片
 * @param {{pos: number, gene: string, layer: number}} geneItem
 */
const getGeneImage = geneItem => {
  const resourceTable = findGeneResource(geneItem.pos, geneItem.gene);
  if (resourceTable == null) {
    return null;
  }
  const geneIconName = "gene_" + resourceTable.Assets;
  const img = GeneIcon[geneIconName];
  return img;
};

/**
 * 渲染单个基因
 * @param {{image: SKImage, key: string}} geneImage
 */
const renderGene = (geneImage, w, h) => {
  if (geneImage.image == null) {
    return null;
  }
  return (
    <Image
      position="absolute"
      alt="img"
      source={geneImage.image}
      key={geneImage.image}
      fit="contain"
      x={0}
      y={0}
      width={w * 0.9}
      height={h * 0.9}
    />
  );
};

/**
 * 生成随机背景色（浅色系）
 * @returns {string} 背景色
 */
const randBackGroundColor = () => {
  const r = (((Math.random() * 64) >> 0) + 192).toString(16);
  const g = (((Math.random() * 64) >> 0) + 192).toString(16);
  const b = (((Math.random() * 64) >> 0) + 192).toString(16);

  return `#${r}${g}${b}`;
};

/**
 *
 * @param {{width: string, height: string, gene: string}} props
 * @returns
 */
const CrystalBallComponent = props => {
  const ref = useRef();
  if (!props.gene) return null;
  const geneResource = splitGenePos(props.gene);
  const width = parseInt(props.width);
  const height = parseInt(props.height);
  const style = StyleSheet.create({
    width: width,
    height: height,
    backgroundColor: "transparent",
  });
  let geneImages = [];

  for (let i = 0; i < geneResource.length; i++) {
    // const geneImage = useImage(getGeneImage(geneResource[i]));
    const geneImage = getGeneImage(geneResource[i]);
    geneImages[i] = {
      image: geneImage,
      key: geneResource[i].pos,
    };
  }

  // const onCapture = useCallback(uri => {
  //   console.log("do something with ", uri);
  // }, []);

  // useEffect(() => {
  //   // on mount
  //   ref.current.capture().then(uri => {
  //     console.log(uri, '---');
  //   });
  // }, []);

  return (
    <ViewShot  ref={props.customRef} options={{ fileName: "aida", format: "jpg", quality: 0.9 }}>
      <VStack style={style} alignItems="center" bg="red.100" justifyContent="center">
        {geneImages.map(x => renderGene(x, width, height))}
      </VStack>
    </ViewShot>
  );
};
export default React.memo(CrystalBallComponent);
