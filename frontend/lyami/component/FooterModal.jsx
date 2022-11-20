import React from "react";
import { HStack, PresenceTransition } from "native-base";

const FooterModal = props => {
  const { children, show, close } = props;
  return (
    <PresenceTransition
      style={{ width: "100%", position: "absolute", bottom: 0, zIndex:10}}
      visible={show}
      initial={{
        opacity: 0,
        translateY: 20,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        transition: {
          duration: 250,
        },
      }}
    >
      {children}
    </PresenceTransition>
  );
};

export default React.memo(FooterModal);
