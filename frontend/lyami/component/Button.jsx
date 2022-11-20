import React from "react";
import { Button as DefaultButton, Text } from "native-base";
import { pxToDp } from "../../utils/stylesKits";

const Button = props => {
  const { type, isDisabled, children, color, fontSize, lineHeight, textW } = props;

  switch (type) {
    case "lg":
      return (
        <DefaultButton
          justifyContent="center"
          alignItems="center"
          {...styles.lg}
          _disabled={{ bg: "#D4D5D9", opacity: 1 }}
          {...props}
        >
          <Text
            w={textW ? textW : "100%"}
            h={pxToDp(145)}
            // lineHeight={lineHeight ? pxToDp(51) : styles.lg.fontSize}
            lineHeight={lineHeight ? pxToDp(51) : pxToDp(145)}
            textAlign="center"
            color={color ? color : "white"}
            fontSize={fontSize ? fontSize : styles.lg.fontSize}
          >
            {children}
          </Text>
        </DefaultButton>
      );
    case "sm":
      return (
        <DefaultButton
          justifyContent="center"
          alignItems="center"
          {...styles.sm}
          _disabled={{ bg: "#D4D5D9", opacity: 1 }}
          {...props}
        >
          <Text
            h={pxToDp(95.1)}
            lineHeight={pxToDp(90.1)}
            color={color ? color : "white"}
            fontSize={fontSize ? fontSize : styles.sm.fontSize}
          >
            {children}
          </Text>
        </DefaultButton>
      );
    default:
      return (
        <DefaultButton justifyContent="center" alignItems="center" _disabled={{ bg: "#D4D5D9", opacity: 1 }} {...props}>
          <Text
            lineHeight={props.h}
            h={props.h}
            w={textW ? textW : "100%"}
            textAlign="center"
            color={color ? color : "white"}
            fontSize={fontSize}
          >
            {children}
          </Text>
        </DefaultButton>
      );
  }
};

export default React.memo(Button);

const styles = {
  lg: {
    w: pxToDp(858),
    h: pxToDp(145),
    // lineHeight: pxToDp(145),
    fontSize: pxToDp(50),
    bg: "#5D51D2",
    borderRadius: "10px",
    fontWeight: "bold",
    variant: "transparent",
  },
  sm: {
    w: pxToDp(285.7),
    h: pxToDp(95.1),
    fontSize: pxToDp(45),
    bg: "#5D51D2",
    borderRadius: pxToDp(24),
    fontWeight: "bold",
    variant: "transparent",
  },
};
