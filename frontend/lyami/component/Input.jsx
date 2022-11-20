import React from "react";
import { Input as DefaultInput, Text } from "native-base";
import { pxToDp } from "../../utils/stylesKits";

const Input = props => {
  return (
    <DefaultInput
      borderColor="#AFBAC5"
      borderWidth={pxToDp(2)}
      h={pxToDp(111)}
      borderRadius={pxToDp(19)}
      _focus={{ backgroundColor: "white", borderColor: "#5C50D2" }}
      fontSize={pxToDp(36)}
      {...props}
    ></DefaultInput>
  );
};

export default React.memo(Input);
