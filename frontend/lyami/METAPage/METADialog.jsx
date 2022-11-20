import React, { useState, useEffect } from "react";
import { Actionsheet, Text, VStack, Center } from "native-base";
import { Crystalball } from "../api/web3/Crystalball";
import global from "../api/util/global";
import { contractAddress } from "../api/util/constant";
import config from "../api/util/config";
import { FlatList } from "react-native";
import Tabs from "./compoments/Tabs";
import ListItem from "./compoments/ListItem";
import { useNavigation } from "@react-navigation/native";
import { screenWidth, screenHeight } from "../../utils/stylesKits";
import { handleGetNFTJson } from "../api/service";
import Spin from "../component/Spin";

/**
 * META 列表弹窗组件
 * @param {boolean} isShow  
 * @param {function} close
 * @param {string} ballid  水晶球ID 
 * @returns
 */
const METADialog = props => {
  // const { isShow, close, ballid = 2 } = props;
  const { ballid } = props.route.params.item
  const [METALists, setMETAList] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);

  const goToItemDetail = item => {
    navigation.navigate("METAItemDetail", { item });
  };
  // 获取meta数据
  const getMETADate = async () => {
    try {
      const METAData = await crystalballInstance.getCrystalBallMeta(ballid, 0, 50); //ballid  后面改成ballid
      return METAData;
    } catch (err) {
      console.log(err, "获取meta数据报错");
    }
  };

  // 
  const refreshData = () => {
    console.log('refreshData------');
  }

  useEffect(() => {
    (async function () {
      const res = await getMETADate();
      console.log(res, "res--");
      let promises = [];
      let result = [];
      if (res?.metaUrls.length === 0) {
        setLoading(false);
        return 
      }
      res?.metaUrls.forEach((item, index) => {
        if (item !== '') {
          promises.push(
            new Promise((resolve, reject) => {
              try {
                const obj = handleGetNFTJson(item.replace("ipfs://", config.IPFS_ROOT));
                resolve(obj);
              } catch (err) {
                reject();
              }
            })
          );
        }
      });

      if (promises.length === 0) {
        setLoading(false);
        return
      } 
      Promise.all(promises)
        .then(responce => {
          responce.forEach((item, index) => {
            if (typeof item.data === "string") {
              // const reg = /([^:'\s]+):\s+/g;
              // let obj = item?.data.replaceAll(reg, '"$1":').replaceAll("'", '"');
              // obj = JSON.parse(obj);
              // console.log(obj, typeof obj);
              // result.push({ ...obj, image: obj.image.replace("ipfs://", config.IPFS_ROOT) });
            } else {
              result.push({ ...item.data, image: item.data.image.replace("ipfs://", config.IPFS_ROOT) });
            }
          });
          console.log(result, "result---");
          setMETAList(result);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log(err, "err promise");
        });
    })();
    return () => {};
  }, []);

  return (
    <Actionsheet isOpen={isShow} size="full" onClose={() => close()}>
      <Actionsheet.Content {...styles.bottom}>
        <Spin isSpin={loading}>
          <VStack h={screenHeight - 10}>
            <VStack h="11%">
              <Center>
                <Text fontSize="22px" fontWeight="bold">
                  META
                </Text>
              </Center>
              <Tabs style={{ marginTop: "2", width: screenWidth }} tabs={["大厅META", "三清META"]} tabIndex={tabIndex} setTabIndex={index => setTabIndex(index)} />
            </VStack>
            <VStack h="68%">
              <FlatList
                refreshing={false}
                onRefresh={() => refreshData()}
                data={METALists}
                // data={[...new Array(100).keys()]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  // return <Text>每一行数据</Text>
                  return <ListItem item={item} click={() => goToItemDetail(item)} />;
                }}
              />
            </VStack>
          </VStack>
        </Spin>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

const styles = {
  bottom: {
    marginBottom: 0,
    marginTop: "auto",
    paddingBottom: 10,
    borderRadius: 0,
  },
};

export default React.memo(METADialog);
