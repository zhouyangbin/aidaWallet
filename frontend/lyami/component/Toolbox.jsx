import React, { useState } from "react";
import { HStack, VStack, Image, Text, Pressable, Box, Select, } from "native-base";
import { pxToDp, screenHeight, screenWidth } from "../../utils/stylesKits";
import Icons from "../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "../../language/I18n";

const Toolbox = props => {
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(false);
  const [step, setStep] = useState(1); //1: 显示工具栏，2： 显示工具栏具体的功能页面
  const [service, setService] = React.useState("");


  const showLanguageCom = () => {
    console.log(111);
    setStep(2);
    // setIsShow(true);
  };

  const setLanguage = (value) => {
    I18n.defaultLocale = value;
    setService(value)
  }

  const LanguageCom = () => {
    return (
      <VStack position="absolute" zIndex="100" w={screenWidth} h={screenHeight} bg="#fff">
        <Text ml={pxToDp(30)} mt={pxToDp(40)} color="#181818" fontWeight="600" fontSize={pxToDp(50)}>
          请选择语言 {service} 当前语言是
        </Text>
        <Select
          ml={pxToDp(30)}
          mt={pxToDp(50)}
          selectedValue={service}
          minWidth="200"
          w={pxToDp(800)}
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "teal.600",
            // endIcon: <CheckIcon size="5" />
          }}
          // mt={1}
          onValueChange={itemValue => setLanguage(itemValue) }
        >
          <Select.Item label="Chinese" value="zhcn" />
          <Select.Item label="English" value="en" />
        </Select>
      </VStack>
    );
  };

  return (
    <VStack w={screenWidth} h={screenHeight} bg="#fff" position="absolute">
      {/* 顶部导航栏 start  */}
      <HStack h={pxToDp(200)} pt={pxToDp(40)} pl={pxToDp(40)} pr={pxToDp(40)} alignItems="center" justifyContent="space-between">
        <Pressable onPress={() => navigation.goBack()}>
          <Image alt="img" w={pxToDp(50)} h={pxToDp(50)} source={Icons.goBackArrowBIcon} />
        </Pressable>
        <Text color="#181818" fontWeight="800" fontSize={pxToDp(50)}>
          setting
        </Text>
        <Text></Text>
      </HStack>
      {/* 顶部导航栏 end  */}

      {/* 工具栏 start  */}
      <Box>
        {step === 2 ? <LanguageCom /> : null}
        {step === 1 ? (
          <VStack>
            <Pressable onPress={() => showLanguageCom()}>
              <HStack
                pr={pxToDp(19)}
                pl={pxToDp(60)}
                pt={pxToDp(40)}
                pb={pxToDp(40)}
                alignItems="center"
                justifyContent="space-between"
                borderTopWidth={pxToDp(1)}
                borderBottomWidth={pxToDp(1)}
                borderColor="#ddd"
              >
                <VStack>
                  <Text color="#181818" fontWeight="600" fontSize={pxToDp(50)}>
                    语言
                  </Text>
                  {/* <Text color='#181818'  fontSize={pxToDp(36)}></Text> */}
                </VStack>
                <Image alt="img" w={pxToDp(40)} h={pxToDp(40)} source={Icons.hisNavigateArrowIcon} />
              </HStack>
            </Pressable>

            <HStack
              pr={pxToDp(19)}
              pl={pxToDp(60)}
              pt={pxToDp(40)}
              pb={pxToDp(40)}
              alignItems="center"
              justifyContent="space-between"
              borderTopWidth={pxToDp(1)}
              borderBottomWidth={pxToDp(1)}
              borderColor="#ddd"
            >
              <VStack>
                <Text color="#181818" fontWeight="600" fontSize={pxToDp(50)}>
                  通用
                </Text>
                {/* <Text color='#181818'  fontSize={pxToDp(36)}></Text> */}
              </VStack>
              <Image alt="img" w={pxToDp(40)} h={pxToDp(40)} source={Icons.hisNavigateArrowIcon} />
            </HStack>

            <HStack
              pr={pxToDp(19)}
              pl={pxToDp(60)}
              pt={pxToDp(40)}
              pb={pxToDp(40)}
              alignItems="center"
              justifyContent="space-between"
              borderTopWidth={pxToDp(1)}
              borderBottomWidth={pxToDp(1)}
              borderColor="#ddd"
            >
              <VStack>
                <Text color="#181818" fontWeight="600" fontSize={pxToDp(50)}>
                  高级
                </Text>
                {/* <Text color='#181818'  fontSize={pxToDp(36)}></Text> */}
              </VStack>
              <Image alt="img" w={pxToDp(40)} h={pxToDp(40)} source={Icons.hisNavigateArrowIcon} />
            </HStack>

            <HStack
              pr={pxToDp(19)}
              pl={pxToDp(60)}
              pt={pxToDp(40)}
              pb={pxToDp(40)}
              alignItems="center"
              justifyContent="space-between"
              borderTopWidth={pxToDp(1)}
              borderBottomWidth={pxToDp(1)}
              borderColor="#ddd"
            >
              <VStack>
                <Text color="#181818" fontWeight="600" fontSize={pxToDp(50)}>
                  联系人
                </Text>
                {/* <Text color='#181818'  fontSize={pxToDp(36)}></Text> */}
              </VStack>
              <Image alt="img" w={pxToDp(40)} h={pxToDp(40)} source={Icons.hisNavigateArrowIcon} />
            </HStack>

            <HStack
              pr={pxToDp(19)}
              pl={pxToDp(60)}
              pt={pxToDp(40)}
              pb={pxToDp(40)}
              alignItems="center"
              justifyContent="space-between"
              borderTopWidth={pxToDp(1)}
              borderBottomWidth={pxToDp(1)}
              borderColor="#ddd"
            >
              <VStack>
                <Text color="#181818" fontWeight="600" fontSize={pxToDp(50)}>
                  安全与隐私
                </Text>
                {/* <Text color='#181818'  fontSize={pxToDp(36)}></Text> */}
              </VStack>
              <Image alt="img" w={pxToDp(40)} h={pxToDp(40)} source={Icons.hisNavigateArrowIcon} />
            </HStack>

            <HStack
              pr={pxToDp(19)}
              pl={pxToDp(60)}
              pt={pxToDp(40)}
              pb={pxToDp(40)}
              alignItems="center"
              justifyContent="space-between"
              borderTopWidth={pxToDp(1)}
              borderBottomWidth={pxToDp(1)}
              borderColor="#ddd"
            >
              <VStack>
                <Text color="#181818" fontWeight="600" fontSize={pxToDp(50)}>
                  提醒
                </Text>
                {/* <Text color='#181818'  fontSize={pxToDp(36)}></Text> */}
              </VStack>
              <Image alt="img" w={pxToDp(40)} h={pxToDp(40)} source={Icons.hisNavigateArrowIcon} />
            </HStack>

            <HStack
              pr={pxToDp(19)}
              pl={pxToDp(60)}
              pt={pxToDp(40)}
              pb={pxToDp(40)}
              alignItems="center"
              justifyContent="space-between"
              borderTopWidth={pxToDp(1)}
              borderBottomWidth={pxToDp(1)}
              borderColor="#ddd"
            >
              <VStack>
                <Text color="#181818" fontWeight="600" fontSize={pxToDp(50)}>
                  网络
                </Text>
                {/* <Text color='#181818'  fontSize={pxToDp(36)}></Text> */}
              </VStack>
              <Image alt="img" w={pxToDp(40)} h={pxToDp(40)} source={Icons.hisNavigateArrowIcon} />
            </HStack>
          </VStack>
        ) : null}
      </Box>

      {/* 工具栏 end  */}
    </VStack>
  );
};

export default React.memo(Toolbox);
