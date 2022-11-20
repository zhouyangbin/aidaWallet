import React from "react";
import {Box, Pressable, Text} from 'native-base'
import { StyleSheet } from "react-native";

const LyaButton = props => {
  const {text, textColor, width, click } = props;
  console.log(width, 'width');
  return <Pressable  onPress={() => click()}>
    <Box style={{width: width, ...styles.wrap}} alignItems='center' justifyContent='center'>
      <Text color={textColor}> {text} </Text>
    </Box>
  </Pressable>

}

export default React.memo(LyaButton)

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#435463',
    height: 50,
    // width: 360,
    borderRadius: 10
  }
})