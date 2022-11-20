import React from "react";
import { Button,Image, VStack, Box, View, Text } from "native-base";
import Draggable from 'react-native-draggable';

const ComeItem = props => {
  const { type, setRef, text,getLocation,data } = props;
  return (
    <VStack w="100%" mb='5' bg='white' p='4' ref={view => { setRef.current = view; }} onLayout={(event)=>{console.log(event.nativeEvent,'0000000000')}}>
      <Box alignItems="center" position="relative">
        <View w='100%' flexDirection='row' flexWrap='wrap' justifyContent='flex-start'>
          {data.map(item=>{
              return (
                <Box w='16%' style={{aspectRatio:1}} flexWrap='wrap' key={item.id}>
                    <Draggable onDragRelease={(event, gestureState, bounds)=>{
                      console.log(event,gestureState,bounds,'..........................')
                      item.ref.measure( (fx, fy, width, height, px, py) => {
                        let childLocation={px, py}
                        childLocation.locationX=width+px;
                        childLocation.locationY=height+py;
                        getLocation(childLocation,type,item);
                      })
                    }}>
                      <Image
                        ref={view => { item.ref = view; }}
                        w='10'
                        h='10'
                        alt="img"
                        source={{
                          uri: item.img
                        }}
                      ></Image>
                    </Draggable>
              </Box>
            )
        })}
        </View>
        <Box justifyContent="center" w="100%" h='16' mt='4' opacity="0.8" borderRadius='12' bg="#EFF1F5">
          <Text textAlign="center" color='#282828'>{text}</Text>
        </Box>
      </Box>
    </VStack>
  );
};

export default React.memo(ComeItem);
