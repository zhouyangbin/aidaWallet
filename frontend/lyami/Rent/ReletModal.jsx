import React from "react";
import { Text, Modal, HStack } from "native-base";
import Button from "../component/Button";
import { pxToDp } from "../../utils/stylesKits";

const ReletModal = props => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)}>
      <Modal.Content
        w={pxToDp(923)}
        px={pxToDp(55)}
        justifyContent="space-around"
        flexDirection="column"
        h={pxToDp(633)}
      >
        <HStack justifyContent="center" mb={pxToDp(31)}>
          <Text fontWeight="800" fontSize={pxToDp(55)}>
            Information cue
          </Text>
        </HStack>
        <HStack justifyContent="center">
          <Text textAlign="center" fontSize={pxToDp(37)}>
            The lease is about to expire. Do you want to renew it?
          </Text>
        </HStack>
        <HStack justifyContent="space-around">
          <Button color="#5c50D2" bg="transparent" borderWidth={pxToDp(3)} borderColor="#5C50D2" type="sm">
            Reject
          </Button>
          <Button type="sm">Relet</Button>
        </HStack>
      </Modal.Content>
    </Modal>
  );
};

export default React.memo(ReletModal);
