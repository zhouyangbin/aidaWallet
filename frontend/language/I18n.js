import I18n,{ getLanguages } from 'react-native-i18n'
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from "@react-native-community/async-storage";
import en from './en'
import zhcn from './zhcn'
import zhtw from './zhtw'



// const setLanguage = async () => {
//     I18n.defaultLocale = await AsyncStorage.getItem("language");
// }
// setLanguage()
// I18n.defaultLocale = 'zhcn';

I18n.fallbacks = true;

I18n.translations = {
    en,
    zhcn,
    zhtw
};

// I18n.localeLanguage = () => {
//     return I18n.locale;
// };


export { I18n, getLanguages };