import React, { useState } from "react";
import { VStack, Image, FlatList } from "native-base";
import global from "../../api/util/global";
// import { contractAddress as ERC721contractAddress } from "../../api/util/constant";
import config from "../../api/util/config";
import { Crystalball } from "../../api/web3/Crystalball";
import CrystalBallComponent from "../../NFTAssetsPage/Crystalball";
import AssetsItem from "../../NFTAssetsPage/AssetsItem";
import { pxToDp } from "../../../utils/stylesKits";
import { useEffect } from "react";
import { ERC721 } from "../../api/web3/ERC721";
import { handleGetNFTJson } from "../../api/service";
import Spin from "../../component/Spin";

// 收藏页签内容
const CollectionPage = (props) => {
  const {
    collectionList,
    setIsShow,
    setSelectItem,
    selectHandler,
    contractAddress,
  } = props;
  const crystalballInstance = new Crystalball(
    global.web3,
    config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]
  );
  const ERC721Instance = new ERC721(global.web3, contractAddress); // web3: Web3, contractAddress: string
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(collectionList, "----collectionList----");

  //获取水晶人列表
  const getCrystallBallData = async () => {
    if (collectionList.length === 0) return;
    let promises = [];
    collectionList.forEach((id, index) => {
      // if (typeof id == "string") {
        promises.push(
          new Promise((resolve, reject) => {
            try {
              const res = crystalballInstance.getCrystalballProperty(id);
              resolve(res);
            } catch (err) {
              reject(err);
              console.log(err, "获取收藏的水晶人数据报错");
            }
          })
        );
      // }
    });

    try {
      const response = await Promise.all(promises);
      console.log(response);
      return response;
    } catch (err) {
      setLoading(false);
      console.log(err, "获取aida数据有错 ------");
      return false;
    }
  };

  const getNFTData = async (urlList) => {
    if (urlList.length === 0) return;
    let promises = [];
    urlList.forEach((item, index) => {
      promises.push(
        new Promise((resolve, reject) => {
          let res;
          try {
            if (item.indexOf("http") > 0) {
              res = handleGetNFTJson(item);
            } else {
              res = handleGetNFTJson(item.replace("ipfs://", config.IPFS_ROOT));
            }
            resolve(res);
          } catch (err) {
            reject(err);
            console.log(err, "请求NFT数据错误");
          }
        })
      );
    });
    try {
      const response = await Promise.all(promises);
      console.log(response[0]["data"], "---response----NFT 数据");
      const res = response.map((item) => {
        if (item.data.image.indexOf("http") > -1) {
          return item.data;
        } else {
          return {
            ...item.data,
            image: item.data.image.replace("ipfs://", config.IPFS_ROOT),
          };
        }
      });
      console.log(res, "-----转换image 格式-----");
      return res;
    } catch (err) {
      console.log(err, "获取NFT数据出错----");
      return false;
    }
  };
  // 获取NFT列表数据
  const getNFTUrls = async () => {
    if (collectionList.lenght === 0) return;
    let promises = [];
    // 通过收藏的tokenID 获取到URL
    collectionList.forEach((id, index) => {
      promises.push(
        new Promise(async (resolve, reject) => {
          try {
            const url = await ERC721Instance.tokenURI(id);
            let res;
            if (url.indexOf("http") > 0) {
              res = await handleGetNFTJson(url);
            } else {
              res = await handleGetNFTJson(
                url.replace("ipfs://", config.IPFS_ROOT)
              );
            }
            if (res.data.image) {
              res.data.image = res.data?.image.replace(
                "ipfs://",
                config.IPFS_ROOT
              );
            }
            const redO = {
              ...res.data,
              ...{ id: id },
            };
            resolve(redO);
          } catch (err) {
            // reject(err);
            resolve('');
            console.log(err, "获取收藏的NFT数据报错");
          }
        })
      );
    });

    try {
      const data = await Promise.all(promises); // urls 是url 组成的 array
      return data;
    } catch (err) {
      console.log(err, "NFT promiseall err");
      return false;
    }
  };

  const getData = async () => {
    setLoading(true);
    let res = [];
    // 分两种情况，一种是水晶球数据，一种是NFT数据
    if (contractAddress === config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]) {
      // 水晶人
      res = await getCrystallBallData();
    } else {
      // NFT
      res = await getNFTUrls();
    }
    if (res && res.length !== 0) {
      const validRes = res.filter(x => x != '');
      console.log(validRes, 'validRes---');
      setList([...validRes]);
    } else {
      //没有数据 获取请求出错
    }
    setLoading(false);
  };
  // 初始化收藏数据列表
  useEffect(() => {
    (async function () {
      console.log("collectionList.length", collectionList.length);
      if (collectionList.length) {
        await getData();
      } else {
        setList([]);
        setLoading(false);
      }
    })();
  }, [collectionList.length]);

  const refreshData = () => {
    getData();
  };

  //渲染收藏的水晶人列表item
  const renderCrystabllItem = ({ item, index }) => {
    // console.log("Collection item9999999999",item)
    const renderImage = (payload) => {
      if (payload.gene) {
        return (
          <CrystalBallComponent
            width={pxToDp(421)} 
            height={pxToDp(403)}
            type="primary"
            gene={payload.gene}
          />
        );
      }
      return (
        <Image
          w={pxToDp(410)}
          h={pxToDp(410)}
          source={{ uri: payload.image }}
        />
      );
    };
    return (
      <AssetsItem
        renderImage={(payload) => renderImage(payload)}
        contractAddress={contractAddress}
        isR={index % 2 == 0}
        hasButtons={false}
        breedPress={(payload) => {
          // setShowBreed(true);
          // setDetailsItem(payload);
        }}
        onClick={(payload) => {
          // setIsShow(true)
          // setSelectItem(payload)
          selectHandler(payload);
          // setDetailsItem(payload);
          // setShowDetail(true);
        }}
        payload={item}
      ></AssetsItem>
    );
  };
  return (
    <VStack position="relative">
      <Spin isSpin={loading} textContent="waiting...">
        <FlatList
          w="100%"
          refreshing={false}
          horizontal={false}
          onRefresh={() => refreshData()}
          numColumns={2}
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => renderCrystabllItem({ item, index })}
        />
      </Spin>
    </VStack>
  );
};

export default React.memo(CollectionPage);
