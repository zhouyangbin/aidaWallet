import React, { useState, useRef } from "react";
import { Text, Input, Modal, FormControl, KeyboardAvoidingView } from "native-base";
import Button from "../Button";
import { pxToDp } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import { StyleSheet, Alert, DevSettings } from "react-native";
import global from "../../api/util/global";
import { SetLocalPassword } from "../../api/localStorge/LocalStroge";
const ReSetPassword = props => {
  const { modalVisible, setModalVisible,type,parentHandle } = props;
  const navigation = useNavigation();
  const [password, setPassword] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const reSavePassword = async () => {
    console.log(333, password, global.CreateNewPassword);
    if (password != global.CreateNewPassword) {
      Alert.alert("Notice", "Original password input error");
    } else {
      if (!password1 || !password2) {
        Alert.alert("Notice", "Please enter a new password");
        return;
      }
      if (password1 != password2) {
        Alert.alert("Notice", "New password twice input matching error");
        return;
      }
      // 更新用户账号
      global.CreateNewPassword = password2;
      SetLocalPassword(password2);
      setModalVisible(false);
      navigation.push("lyamiLogin");
    }
  };
 const passwordLoginHandle = async () => {
  if (password != global.CreateNewPassword) {
    Alert.alert("Notice", "password input error");
  }else{
    parentHandle();
    setModalVisible(false);
  }
 }
  return (
    // <KeyboardAvoidingView>
    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
      <Modal.Content>
        <Modal.Body>
          {type == "resetPassword" ? (
            <>
              <Text>Setting password</Text>
              <FormControl isRequired>
                <FormControl.Label>Current password</FormControl.Label>
                <Input
                  h={pxToDp(111)}
                  defaultValue=""
                  placeholder="Please"
                  borderColor="#AFBAC5"
                  borderWidth={pxToDp(2)}
                  borderRadius={pxToDp(19)}
                  _focus={{
                    borderColor: "darkBlue.400",
                    backgroundColor: "transparent",
                  }}
                  value={password}
                  onChangeText={e => setPassword(e)}
                />
                <FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText>
              </FormControl>
              <FormControl mt="2" isRequired>
                <FormControl.Label>New Password</FormControl.Label>
                <Input
                  type="password"
                  h={pxToDp(111)}
                  defaultValue=""
                  placeholder="Please"
                  borderColor="#AFBAC5"
                  borderWidth={pxToDp(2)}
                  borderRadius={pxToDp(19)}
                  _focus={{
                    borderColor: "darkBlue.400",
                    backgroundColor: "transparent",
                  }}
                  value={password1}
                  onChangeText={e => setPassword1(e)}
                />
                <FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText>
              </FormControl>
              <FormControl mt="2" isRequired>
                <FormControl.Label>Again new Password</FormControl.Label>
                <Input
                  type="password"
                  h={pxToDp(111)}
                  defaultValue=""
                  placeholder="Please"
                  borderColor="#AFBAC5"
                  borderWidth={pxToDp(2)}
                  borderRadius={pxToDp(19)}
                  _focus={{
                    borderColor: "darkBlue.400",
                    backgroundColor: "transparent",
                  }}
                  value={password2}
                  onChangeText={e => setPassword2(e)}
                />
                <FormControl.HelperText>
                  {password1 && password2 && password1 != password2 ? "The two passwords are inconsistent" : " "}
                </FormControl.HelperText>
                {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Something is wrong.
                  </FormControl.ErrorMessage> */}
              </FormControl>
            </>
          ) : null}
          {type == "passwordLogin" ? (
            <>
              <Text></Text>
              <FormControl isRequired>
                <FormControl.Label>Current password</FormControl.Label>
                <Input
                  h={pxToDp(111)}
                  defaultValue=""
                  placeholder="Please"
                  borderColor="#AFBAC5"
                  borderWidth={pxToDp(2)}
                  borderRadius={pxToDp(19)}
                  _focus={{
                    borderColor: "darkBlue.400",
                    backgroundColor: "transparent",
                  }}
                  value={password}
                  onChangeText={e => setPassword(e)}
                />
              </FormControl>
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer justifyContent="center">
          <Button
            h={pxToDp(101)}
            mr={pxToDp(40)}
            colorScheme="blueGray"
            onPress={() => {
              setModalVisible(false);
            }}
          >
            {I18n.t("wallet.cancel")}
          </Button>
          {type == "resetPassword" ? (
            <>
              <Button
                h={pxToDp(101)}
                onPress={() => {
                  reSavePassword();
                }}
              >
                {I18n.t("setting.Save")}
              </Button>
            </>
          ) : null}
          {type == "passwordLogin" ? (
            <>
              <Button
                h={pxToDp(101)}
                onPress={() => {
                  passwordLoginHandle();
                }}
              >
                {I18n.t("setting.Save")}
              </Button>
            </>
          ) : null}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
const styles = StyleSheet.create({
  listBox: {
    width: "90%",
    marginLeft: "5%",
  },
  listText1: {
    color: "#746969",
    fontWeight: "600",
    fontSize: pxToDp(41),
  },
  listText2: {
    color: "#746969",
    fontWeight: "600",
    fontSize: pxToDp(31),
    lineHeight: pxToDp(41),
  },
});
export default React.memo(ReSetPassword);
