import React, { useState, useRef } from "react";
import { FlatList, Stack, Box, Image, Text } from "native-base";
import { Pressable } from "react-native";
import { pxToDp } from "../../utils/stylesKits";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import Icons from "../asset/Icon";
import ViewShot from "react-native-view-shot";

const RenderSonAIDAItem = props => {
  const { item, index, setItemIndex, setCrystalImage, selectAIDA, itemIndex } = props;
  const ref = useRef();
  const clickHandler = (bytes, index) => {
    console.log(bytes, "接收到的bytes---");
    setItemIndex(index);
    setCrystalImage(bytes);
  };

  const getImage = () => {
    try {
      const image = ref.current?.makeImageSnapshot();
      // console.log(image, 'image--- makeImageSnapshot------');
      if (image) {
        const bytes = image.encodeToBytes();
        // console.log(bytes, 'bytes---encodeToBytes------');
        setCrystalImage(bytes);
      }
    } catch (err) {
      console.log(err, "err-----");
    }
  };

  const viewShot = () => {
    ref.current.capture().then(uri => {
      setCrystalImage(uri); //aida头像通过image 渲染后，截图image图片
      console.log(uri, "---");
    });
  };

  const clickItemHandler = (item, index) => {
    console.log(item, index, "---点击子aida--");
    setItemIndex(index);
    // getImage();
    viewShot();
    selectAIDA(item, index);
  };
  const handleReturnText = payload => {
    if (payload.reproductionInterval == 0) {
      return (
        <Text
          bg="#F1F0FF"
          borderRadius={pxToDp(30)}
          w="71%"
          textAlign="center"
          fontWeight="bold"
          color="#14CA54"
          fontsize={pxToDp(34)}
        >
          KID#
        </Text>
      );
    }
    if (payload.reproductionInterval > 0) {
      return (
        <Text fontWeight="bold" color="red.500" fontsize={pxToDp(34)}>
          {payload.reproductionInterval}
        </Text>
      );
    }
  };

  return (
    <Pressable onPress={() => clickItemHandler(item, index)}>
      <Box
        position="relative"
        alignItems="center"
        mb={pxToDp(41)}
        mr={pxToDp(41)}
        w={pxToDp(478)}
        h={pxToDp(478)}
        bg="#fff"
        borderRadius={pxToDp(30)}
        borderColor={itemIndex === index ? "#938CF5" : "#fff"}
        borderWidth={pxToDp(4)}
      >
        {item?.isNew ? (
          <Image
            position="absolute"
            top={-pxToDp(16)}
            left={-pxToDp(16)}
            w={pxToDp(159)}
            h={pxToDp(159)}
            source={Icons.sonNewIcon}
          />
        ) : null}
        <CrystalBallComponent
          customRef={ref}
          clickHandler={bytes => clickHandler(bytes, index)}
          type="primary"
          width={pxToDp(421)} 
          height={pxToDp(403)}
          gene={item.gene}
        />
        {handleReturnText(item)}
      </Box>
    </Pressable>
  );
};

const SonAIDA = props => {
  const [itemIndex, setItemIndex] = useState(null);
  const { sonAIDAList, setCrystalImage, selectAIDA } = props;
  // const ref = useCanvasRef();

  // const clickHandler = (bytes, index) => {
  //   console.log(bytes, '接收到的bytes---');
  //   setItemIndex(index)
  //   setCrystalImage(bytes)
  // }

  // const getImage = () => {
  //   try{
  //     const image = ref.current?.makeImageSnapshot();
  //     console.log(image, 'image--- makeImageSnapshot------');
  //     if (image) {
  //       const bytes = image.encodeToBytes();
  //       console.log(bytes, 'bytes---encodeToBytes------');
  //       setCrystalImage(bytes)
  //     }
  //   }catch(err) {
  //     console.log(err, 'err-----');
  //   }
  // }

  // const clickItemHandler = (item, index) => {
  //   setItemIndex(index);
  //   // clickHandler('',index)
  //   getImage()
  //   selectAIDA(item,index)
  // };

  const refreshData = props => {
    console.log("刷新页面");
  };
  return (
    <Stack>
      <FlatList
        w="100%"
        refreshing={false}
        horizontal={false}
        onRefresh={() => refreshData()}
        numColumns={2}
        data={sonAIDAList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <RenderSonAIDAItem
              item={item}
              index={index}
              setItemIndex={setItemIndex}
              setCrystalImage={setCrystalImage}
              selectAIDA={selectAIDA}
              itemIndex={itemIndex}
            />
          );
        }}
      />
    </Stack>
  );
};

export default React.memo(SonAIDA);
