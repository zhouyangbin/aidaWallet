import React from "react";
import { VStack, HStack, Modal, Text } from "native-base";
import { NativeModules, SafeAreaView } from "react-native";
import Button from "../../component/Button";
import { pxToDp } from "../../../utils/stylesKits";
const captchaHelper = NativeModules.NTESCaptchaHelper; //对象创建
// captchaHelper.init(options);

const SafetyCaptcha = (props) => {
  const { show, close } = props;
  return (
    <Modal isOpen={show} onClose={() => close(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Text>Safety verification</Text>
        </Modal.Header>
        <Modal.Body>
          <SafeAreaView style={{ flex: 1 }}>
            <Button
              type="sm"
              onPress={() =>
                captchaHelper.init({
                  captcha_id: "af02bc0c53354f429e0c7c07d4900bf8",
                  is_no_sense_mode: false,
                  language_type: "en-US",
                  styleConfig: {
                    radius: pxToDp(30),
                    capBarBorderColor:'transparent',
                    capBarTextColor: "#181818",
                    capBarTextSize: pxToDp(54),
                    capBarTextWeight: "800",
                    capBodyPadding:pxToDp(53),
                    borderColor:'transparent',
                    background:"#5C50D2",
                    borderColorMoving:'transparent',
                    backgroundMoving:'#E3E6EB',
                    height:pxToDp(140),
                    borderRadius:pxToDp(19)
                  },
                })
              }
            >
              初始化
            </Button>
            <Button onPress={() => captchaHelper.showCaptcha()}>显示验证码</Button>
          </SafeAreaView>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default React.memo(SafetyCaptcha);
