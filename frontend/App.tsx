import React,{useState} from "react";
import { useWalletConnect } from "./WalletConnect";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { LogBox } from "react-native";
import { NativeBaseProvider, StatusBar } from "native-base";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import lyamiLogin from "./lyami/login";
import WalletMainNew from "./lyami/WalletMainNew";
import Market from "./lyami/CrystalMarket";
import CoinDetail from "./lyami/CoinDetail";
import IntentComponent from "./lyami/IntentComponent";
import AddAssets from "./lyami/AddAssetsPage";
import PostAsset from "./lyami/PostAssetPage";
import NFTAsset from "./lyami/NFTAssetsPage";
import HistoryList from "./lyami/HistoryList";
import ImportAccount from "./lyami/ImportAccount";
import ExportAccount from "./lyami/ExportAccount";
import HistoryItemRecord from "./lyami/HistoryItemRecord";
import { ShoppingMall, Cart, TrendPage, ShelvesPage, ProductDetail } from "./lyami/Shopping";
import Payment, { PayOrder } from "./lyami/Payment";
import { Exchange, ExchangeLoading, ExGetPriceModal } from "./lyami/Exchange";
import TempPayPage from "./lyami/TempPayPage";
import ThirdPayPage from "./lyami/IntentModal/ThirdPayPage";
import ExportResult from "./lyami/ExportResult";
import WithdrawPage from "./lyami/IntentModal/WithdrawPage";
import ComePage from "./lyami/IntentModal/ComePage";
import AIDAPage from "./lyami/METAPage";
import METAItemDetail from "./lyami/METAPage/METAItemDetail";
import ConcernList from "./lyami/METAPage/ConcernList";
import IntentMetaPage from "./lyami/IntentModal/IntentMetaPage";
import METADetail from "./lyami/METAPage/METADetail";
import ForwardPage from "./lyami/METAPage/Forward";
import METASpace from "./lyami/METAPage/METASpace";
import PaymentIndex from "./lyami/Modal/CollectionModal";
import CreateTypePage from "./lyami/CreateWalletPage/CreateTypePage";
import CreatePersonAccount from "./lyami/CreateWalletPage/CreatePersonAccount";
import SelectArea from "./lyami/CreateWalletPage/CreatePersonAccount/SelectArea";
import AddNetWork from "./lyami/AddNetWork";
import RentPage from "./lyami/Rent";
//设置
import Toolbox from "./lyami/component/ToolBox/Toolbox";
import General from "./lyami/component/ToolBox/General";
import Advanced from "./lyami/component/ToolBox/Advanced";
import Contacts from "./lyami/component/ToolBox/Contacts";
import SecAndPrivacy from "./lyami/component/ToolBox/SecAndPrivacy";
import Notice from "./lyami/component/ToolBox/Notice";
import Network from "./lyami/component/ToolBox/Network";
import Introduction from "./lyami/component/ToolBox/Introduction";
import LoginAndPaySetting from "./lyami/component/ToolBox/LoginAndPaySetting";
import CoinAssetsPage from "./lyami/CoinAssetsPage";
import MineSpace from "./lyami/MineSpace";
import LoadingProvider from "./lyami/component/LoadingProvider";
import { GlobalStoreProvider } from "./lyami/api/Store/globalHook";
import TunedPage from "./lyami/component/TunedPage";
import PrivacyPolicy from "./lyami/component/ToolBox/PrivacyPolicy";
import TermsAndConditions from "./lyami/component/ToolBox/TermsAndConditions";
import DownloadPage from "./lyami/DownloadPage";
import {I18n} from "./language/I18n"
import AsyncStorage from "@react-native-community/async-storage";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
LogBox.ignoreAllLogs();



function App(props): JSX.Element {
  const connector = useWalletConnect();
  const [lang, setLang] = useState('en')

  const setLanguage = async () => {
    const language = await AsyncStorage.getItem("language") || 'en';
    console.log(language, '---language---language');
    console.log(I18n.defaultLocale, 'I18n.defaultLocale');
    
    I18n.defaultLocale = language
    setLang(language)
  }
  setLanguage()

  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="transparent" translucent></StatusBar>
      <GlobalStoreProvider>
        <NavigationContainer>
          <LoadingProvider>
            <Stack.Navigator initialRouteName="login">
              <Stack.Screen name="lyamiLogin" component={lyamiLogin} options={{ headerShown: false }} />
              <Stack.Screen name="WalletMainNew" component={WalletMainNew} options={{ headerShown: false }} />
              <Stack.Screen name="ImportAccount" component={ImportAccount} options={{ headerShown: false }} />
              <Stack.Screen name="ExportResult" component={ExportResult} options={{ headerShown: false }} />
              <Stack.Screen name="ExportAccount" component={ExportAccount} options={{ headerShown: false }} />
              <Stack.Screen name="CoinDetail" component={CoinDetail} options={{ headerShown: false }} />
              <Stack.Screen name="Market" component={Market} options={{ headerShown: false }} />
              <Stack.Screen
                name="Intent"
                component={IntentComponent}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="CoinAssetsPage" component={CoinAssetsPage} options={{ headerShown: false }} />
              <Stack.Screen name="AddAssets" component={AddAssets} options={{ headerShown: false }} />
              <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
              <Stack.Screen name="AddNetWork" component={AddNetWork} options={{ headerShown: false }} />
              <Stack.Screen name="PostAsset" component={PostAsset} options={{ headerShown: false }} />
              <Stack.Screen name="ExchangeLoading" component={ExchangeLoading} options={{ headerShown: false }} />
              <Stack.Screen name="Exchange" component={Exchange} options={{ headerShown: false }} />
              <Stack.Screen name="PayOrder" component={PayOrder} options={{ headerShown: false }} />
              <Stack.Screen name="NFTAsset" component={NFTAsset} options={{ headerShown: false }} />
              <Stack.Screen name="ExGetPriceModal" component={ExGetPriceModal} options={{ headerShown: false }} />
              <Stack.Screen name="HistoryList" component={HistoryList} options={{ headerShown: false }} />
              <Stack.Screen name="HistoryItemRecord" component={HistoryItemRecord} options={{ headerShown: false }} />
              <Stack.Screen name="ShoppingMall" component={TunedPage} options={{ headerShown: false }} />
              <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
              <Stack.Screen name="TrendPage" component={TrendPage} options={{ headerShown: false }} />
              <Stack.Screen name="ShelvesPage" component={ShelvesPage} options={{ headerShown: false }} />
              <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
              <Stack.Screen name="TempPayPage" component={TempPayPage} options={{ headerShown: false }} />
              <Stack.Screen name="ThirdPayPage" component={ThirdPayPage} options={{ headerShown: false }} />
              <Stack.Screen name="ThirdPaySuccessPage" component={ThirdPayPage} options={{ headerShown: false }} />
              <Stack.Screen name="WithdrawPage" component={WithdrawPage} options={{ headerShown: false }} />
              <Stack.Screen name="ComePage" component={ComePage} options={{ headerShown: false }} />
              <Stack.Screen name="AIDAPage" component={AIDAPage} options={{ headerShown: false }} />
              <Stack.Screen name="METAItemDetail" component={METAItemDetail} options={{ headerShown: false }} />
              <Stack.Screen name="ConcernList" component={ConcernList} options={{ headerShown: false }} />
              <Stack.Screen name="IntentMetaPage" component={IntentMetaPage} options={{ headerShown: false }} />
              <Stack.Screen name="METADetail" component={METADetail} options={{ headerShown: false }} />
              <Stack.Screen name="ForwardPage" component={ForwardPage} options={{ headerShown: false }} />
              <Stack.Screen name="METASpace" component={METASpace} options={{ headerShown: false }} />
              <Stack.Screen name="PaymentIndex" component={PaymentIndex} options={{ headerShown: false }} />
              <Stack.Screen name="CreateTypePage" component={CreateTypePage} options={{ headerShown: false }} />
              <Stack.Screen
                name="CreatePersonAccount"
                component={CreatePersonAccount}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="SelectArea" component={SelectArea} options={{ headerShown: false }} />
              <Stack.Screen name="RentPage" component={RentPage} options={{ headerShown: false }} />
              {/* 设置 */}
              <Stack.Screen
                name="Toolbox"
                component={Toolbox}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="General" component={General} options={{ headerShown: false }} />
              <Stack.Screen name="Advanced" component={Advanced} options={{ headerShown: false }} />
              <Stack.Screen name="Contacts" component={Contacts} options={{ headerShown: false }} />
              <Stack.Screen name="SecAndPrivacy" component={SecAndPrivacy} options={{ headerShown: false }} />
              <Stack.Screen name="LoginAndPaySetting" component={LoginAndPaySetting} options={{ headerShown: false }} />
              <Stack.Screen name="Notice" component={Notice} options={{ headerShown: false }} />
              <Stack.Screen name="Network" component={Network} options={{ headerShown: false }} />
              <Stack.Screen name="Introduction" component={Introduction} options={{ headerShown: false }} />
              <Stack.Screen name="MineSpace" component={MineSpace} options={{ headerShown: false }} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
              <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} options={{ headerShown: false }} />
              <Stack.Screen name="DownloadPage" component={DownloadPage} options={{ headerShown: false }} />
            </Stack.Navigator>
          </LoadingProvider>
        </NavigationContainer>
      </GlobalStoreProvider>
    </NativeBaseProvider>
  );
}

export default App;
