import React from "react";
import {
  HStack,
  Image,
  Text,
  Pressable,
  PresenceTransition,
} from "native-base";
import Icons from "../asset/Icon";
import { pxToDp } from "../../utils/stylesKits";

const AlertModal = (props) => {
  const {
    w,
    text,
    specialText,
    specialColor,
    mt,
    onClick = () => {},
    show,
  } = props;
  return show ? (
    <PresenceTransition
      visible={show}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 250,
        },
      }}
    >
      <HStack
        mt={mt}
        w={w}
        bg="white"
        padding={pxToDp(19)}
        borderRadius={pxToDp(30)}
        alignItems="flex-start"
        mb={pxToDp(14)}
      >
        <Image
          alt="img"
          mr={pxToDp(19)}
          w={pxToDp(57)}
          h={pxToDp(57)}
          source={Icons.noticeIcon}
        />
        <Pressable flex="1" onPress={onClick()}>
          <Text fontSize={pxToDp(36)}>
            {text}
            <Text color={specialColor}>{specialText}</Text>
          </Text>
        </Pressable>
      </HStack>
    </PresenceTransition>
  ) : null;
};

export default React.memo(AlertModal);
