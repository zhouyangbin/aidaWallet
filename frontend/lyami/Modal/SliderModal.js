import React, { useState } from "react";
import { Center,Text, Modal, useToast, Box, Slider } from "native-base";

import { Pressable } from "react-native";

function requestForPaymentClick(navigation) {
  navigation.navigate("Payment", {});
}

const selectClickHandler = () => {};
const changeValueHandler = () => {};
// 代币列表
const SliderModal = props => {
  const toast = useToast();
  const { showModal, setShowModal } = props;
  const [onChangeValue, setOnChangeValue] = React.useState(70);
  const [onChangeEndValue, setOnChangeEndValue] = React.useState(70);
  return (
    <>
      <Modal isOpen={showModal} size="full" onClose={() => setShowModal(false)}>
        <Modal.Content {...styles.bottom}>
          <Modal.CloseButton />
          <Modal.Body>
            <Center
              _text={{
                color: "black",
                fontWeight: "500",
                paddingBottom: 8,
              }}
            >
              最大滑点
            </Center>
            <Box alignItems="center" w="100%" mb="4" mt="6">
              <Text textAlign="center">onChangeValue - {onChangeValue}</Text>
              <Text textAlign="center">onChangeEndValue - {onChangeEndValue}</Text>
              <Slider
                w="90%"
                defaultValue={70}
                step={5}
                size='lg'
                onChange={v => {
                  setOnChangeValue(Math.floor(v));
                }}
                onChangeEnd={v => {
                  v && setOnChangeEndValue(Math.floor(v));
                }}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </Box>
            <Center
              _text={{
                color: "black",
              }}
            >
              如果汇率在您下单和确认之间发生变化，这被称为“滑点”。如果滑点超过您的“最大滑点”设置，您的交换将自动取消。
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default React.memo(SliderModal);

const styles = {
  bottom: {
    marginTop: "auto",
    borderRadius: 0,
  },
  coinList: {
    borderStyle: "solid",
    // borderWidth: 1,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: "#cdcdcd",
    height: "16",
    direction: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
