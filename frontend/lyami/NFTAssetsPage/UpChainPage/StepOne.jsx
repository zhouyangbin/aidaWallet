import React from "react";
import { Avatar, FlatList, HStack, VStack, Image, Pressable } from "native-base";
import Icons from "../../asset/Icon";
import ape from "@/../../assets/image/ape.webp";
import { useState } from "react";
import { cloneDeep } from "lodash";

const array = [...new Array(50).keys()];
const payloadList = [];
array.map((item, index) => {
  payloadList.push({
    name: index,
    checked: false,
  });
});
const CardItem = props => {
  const { payload, setList, list, index } = props;
  return (
    <Pressable
      onPress={() => {
        const newArray = cloneDeep(list);
        newArray[index].checked = !newArray[index].checked;
        console.log(newArray);
        setList(newArray);
      }}
      mb="2"
      position="relative"
      width="25%"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar size="16" source={ape}></Avatar>
      <Image alt='img' key={payload.checked} bottom="0" right="0" position="absolute" size="6" source={payload.checked ? Icons.selectedIcon : Icons.notSelectIcon}></Image>
    </Pressable>
  );
};
const StepOne = props => {
  const [dataList, setDataList] = useState(payloadList);
  return (
    <VStack h="100%" w="100%">
      <FlatList
        data={dataList}
        horizontal={false}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return <CardItem list={dataList} setList={setDataList} key={index} index={index} payload={item}></CardItem>;
        }}
      ></FlatList>
    </VStack>
  );
};

export default React.memo(StepOne);
