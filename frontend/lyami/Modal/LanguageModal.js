import React from "react";
import { Actionsheet,Text, Box, Button, Divider} from "native-base";
import languageConfig from "../../language/config";
import {I18n} from '../../language/I18n'
const LanguageModal = props => {
  const { show, close } = props;

  const selectLanguage = payload => {
    console.log(payload, '切换语言');
    console.log(payload.lang);
    I18n.locale = payload.lang 
    close(false)
  }
  return (
    <Actionsheet
      isOpen={show}
      onClose={() => close(false)}
      
      // h='100%'
    >
      <Actionsheet.Content maxH='400px' h='200px' p='0'>
        {languageConfig.map((item, index) => {
          return<Box w='100%' key={index}>
            <Button w='100%' variant="unstyled" onPress={() => selectLanguage(item)}>
            {item.name}
            </Button>
            <Divider/>
            
          </Box>
        })}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default React.memo(LanguageModal);
