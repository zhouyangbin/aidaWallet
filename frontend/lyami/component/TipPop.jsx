import React from "react";
import { VStack, Popover, Text, Pressable, Image } from "native-base";
import Icons from "../asset/Icon";

const TipPop = props => {
  const { render, des } = props;
  return (
    <Popover
      trigger={triggerProps => {
        return (
          <Pressable {...triggerProps} flexDirection="row" alignItems="center">
            <Text>{render}</Text>
          </Pressable>
        );
      }}
    >
      <Popover.Content accessibilityLabel="Delete Customerd" w="56">
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Header>小贴士</Popover.Header>
        <Popover.Body>{des}</Popover.Body>
      </Popover.Content>
    </Popover>
  );
};

export default React.memo(TipPop);
