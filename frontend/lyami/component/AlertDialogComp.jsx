import React, { useRef, useState } from "react";
import { Button, AlertDialog } from "native-base";

const AlertDialogComp = props => {
  const { isOpen, close, title, context, confirm } = props;
  const cancelRef = useRef();
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => {
        close(false);
      }}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>{context}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={() => {
                close(false);
              }}
              ref={cancelRef}
            >
              取消
            </Button>
            <Button
              colorScheme="danger"
              onPress={() => {
                close(false);
                confirm();
              }}
            >
              确认
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
export default React.memo(AlertDialogComp);
