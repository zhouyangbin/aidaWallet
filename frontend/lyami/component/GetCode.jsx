import React, { useState } from "react";
import Input from "./Input";
import { Pressable, Text } from "native-base";
import { pxToDp } from "../../utils/stylesKits";
import {I18n} from '../../language/I18n'

const handleClickGetCode = (setIsClick, setTimer) => {
  setIsClick(true);
  let timer = 60;
  let auth_timer = setInterval(() => {
    timer -= 1;
    setTimer(timer);
    if (timer <= 0) {
      setIsClick(false);
      clearInterval(auth_timer);
      timer = 60;
      setTimer(timer);
    }
  }, 1000);
};
const GetCode = (props) => {
  const { onChangeText, onPress } = props;
  const [isClick, setIsClick] = useState(false);
  const [timer, setTimer] = useState(60);

  return (
    <Input
      onChangeText={(value) => onChangeText(value)}
      InputRightElement={
        <Pressable
          pr={pxToDp(47)}
          h="100%"
          justifyContent="center"
          onPress={() => {
            if (isClick) return;
            handleClickGetCode(setIsClick, setTimer);
            onPress();
          }}
        >
          <Text color="#5C50D2" fontSize={pxToDp(36)}>
            {isClick ? timer : I18n.t("register.resend")}
          </Text>
        </Pressable>
      }
    ></Input>
  );
};

export default React.memo(GetCode);
