import React from "react";
import { VStack, Image, Pressable, Text, HStack, StatusBar } from "native-base";
import Button from "../component/Button";
import logo2 from "@/../../assets/image/UiImg/logo2.webp";
import { pxToDp } from "../../utils/stylesKits";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "../../language/I18n";

const CreateTypePage = props => {
  const navigation = useNavigation();
  return (
    <VStack bg="white" alignItems="center" w="100%" h="100%" justifyContent="space-between">
      <Image mt={pxToDp(371)} source={logo2} w={pxToDp(373)} h={pxToDp(383.2)}></Image>
      <VStack mb={pxToDp(303)} alignItems="center">
        <Button
          onPress={() => navigation.navigate("ImportAccount", { fromCreate: true })}
          mb={pxToDp(54)}
          borderWidth={pxToDp(2)}
          color="#5C50D2"
          borderColor="#5C50D2"
          bg="white"
          type="lg"
        >
          {I18n.t("login.importUsingMnemonic")}
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("CreatePersonAccount", {});
          }}
          type="lg"
          mb={pxToDp(54)}
        >
          {I18n.t("login.createNewWallet")}
        </Button>
        {/* <Pressable
          onPress={() => {
            console.log(22);
          }}
        >
          <Text
            color="#5C50D2"
            fontSize={pxToDp(42)}
            fontWeight="bold"
          >
            {I18n.t("login.signRorBusAccount")}
          </Text>
        </Pressable> */}
      </VStack>
    </VStack>
  );
};

export default React.memo(CreateTypePage);
