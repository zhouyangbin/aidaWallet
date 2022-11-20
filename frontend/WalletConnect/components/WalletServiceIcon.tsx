/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-03 13:34:25
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-08-04 17:17:57
 * @FilePath: \aries-wallet-client\frontend\WalletConnect\components\WalletServiceIcon.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { WalletService } from "../types";

// eslint-disable-next-line functional/no-mixed-type
export type WalletServiceIconProps = {
  readonly width: number;
  readonly height: number;
  readonly walletService: WalletService;
  readonly connectToWalletService: (walletService: WalletService) => unknown;
  readonly size?: "sm" | "md" | "lg";
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  fullWidth: { width: "100%" },
  icon: { borderRadius: 15 },
  noOverflow: { overflow: "hidden" },
  title: {
    color: "grey",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  padding: { padding: 5 },
});

export default function WalletServiceIcon({
  width,
  height,
  walletService,
  connectToWalletService,
  size = "md",
}: WalletServiceIconProps): JSX.Element {
  const uri = React.useMemo(
    () =>
      `https://registry.walletconnect.org/logo/${size}/${walletService.id}.jpeg`,
    [walletService, size]
  );
  const onPress = React.useCallback(
    () => connectToWalletService(walletService),
    [connectToWalletService, walletService]
  );
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[{ width, height }, styles.container, styles.padding]}>
        <Image
          style={[
            styles.icon,
            {
              width: height * 0.6,
              height: height * 0.6,
            },
          ]}
          source={{ uri }}
        />
        <Text
          style={[styles.title, styles.fullWidth]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {walletService.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
