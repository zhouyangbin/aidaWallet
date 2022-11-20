import React, { createContext, useState, useRef } from "react";
import { HStack, Box, Text, Pressable } from "native-base";
import { ActivityIndicator } from "react-native";
import LoadingContext from "../../providers/LoadContext";
import { pxToDp } from "../../utils/stylesKits";
import BottomTab from "./BottomTab";
const LoadingProvider = props => {
  const { children } = props;
  const [visible, setVisible] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [message, setMessage] = useState("加载中");
  const [menuSelect, setMenuSelect] = useState(0);
  
  const Loading = () => {
    return (
      <Pressable
        onPress={() => {
          setVisible(false);
        }}
        w="100%"
        h="100%"
        bg="rgba(255,255,255,0.6)"
        position="absolute"
        zIndex="10"
        alignItems="center"
        justifyContent="center"
      >
        <ActivityIndicator></ActivityIndicator>
        <Text fontSize={pxToDp(32)}>加载中</Text>
      </Pressable>
    );
  };

  return (
    <LoadingContext.Provider
      value={{
        show: () => {
          setVisible(true);
        },
        hide: () => {
          setVisible(false);
        },
        showMenu: (index) => {
          setMenuShow(true);
          if(index != undefined){
            setMenuSelect(index)
          }
        },
        hideMenu: () => {
          setMenuShow(false);
        },
      }}
    >
      <Box width="100%" height="100%">
        {visible ? <Loading></Loading> : null}
        {menuShow ? <BottomTab menuSelect={menuSelect} menuShow={menuShow}></BottomTab> : null}
        {children}
      </Box>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
