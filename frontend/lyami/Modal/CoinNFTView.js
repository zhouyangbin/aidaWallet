import React, {Component} from 'react';
import {Tab, TabView} from 'react-native-elements';
import {useState} from 'react';

import {
  NativeBaseProvider,
  View,
  Text,
  Image,
  HStack,
  Stack,
  Center,
  Avatar,
  VStack,
  Box,
  Input,
  Switch,
  Button,
  Link,
  Spacer,
  ChevronRightIcon,
  Pressable,
} from 'native-base';

export default function CoinNFTView(props) {
  const [index, setIndex] = useState(0);
  return (
    <View>
      <Tab value={index} onChange={(value) => {
        setIndex(value);
        if (props.OnTabViewChange != null) {
          props.OnTabViewChange(value);
        }
      }}>
        <Tab.Item title="资产" />
        <Tab.Item title="收藏品" />
        <Tab.Item title="活动" />
      </Tab>

      <TabView value={index} onChange={setIndex}>
        <TabView.Item>
          
        </TabView.Item>
        <TabView.Item>
          
        </TabView.Item>
        <TabView.Item>
          
        </TabView.Item>
      </TabView>
    </View>
  );
}
