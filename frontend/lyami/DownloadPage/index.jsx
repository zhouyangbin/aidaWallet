import React from "react";
import { VStack, Text } from "native-base";
import { pxToDp } from "../../utils/stylesKits";
const DownloadPage = props => {
  return (
    <VStack h="100%" alignItems="center" justifyContent="center">
      <Text fontSize={pxToDp(45)}>当前版本过低，请重新下载</Text>
    </VStack>
  );
};

export default React.memo(DownloadPage);
