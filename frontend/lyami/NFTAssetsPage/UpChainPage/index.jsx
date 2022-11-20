import React, { useState } from "react";
import { VStack, Modal, Button, Text, HStack } from "native-base";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const UpChainPage = props => {
  const { show, close } = props;
  const [uploadStep, setUploadStep] = useState(0);
  return (
    <Modal isOpen={show} onClose={() => close(false)} safeAreaTop={true}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>
          <Text textAlign="center">上链</Text>
        </Modal.Header>
        <Modal.Body>
          <VStack h="400px">{uploadStep == 0 ? <StepOne></StepOne> : <StepTwo></StepTwo>}</VStack>
        </Modal.Body>
        <Modal.Footer>
          {uploadStep == 0 ? (
            <VStack w="100%" justifyContent="center">
              <Button
                bg="darkBlue.400"
                w="100%"
                onPress={() => {
                  setUploadStep(1);
                }}
              >
                下一步
              </Button>
            </VStack>
          ) : (
            <VStack w="100%" mt="-4" justifyContent="center">
              <Text mt="1" textAlign="center" fontSize="12px">
                一键上链需要约150水晶币
              </Text>
              <Button
                bg="darkBlue.400"
                w="100%"
                onPress={() => {
                  close(false);
                }}
              >
                一件上链
              </Button>
            </VStack>
          )}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default React.memo(UpChainPage);
