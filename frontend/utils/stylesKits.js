import { Dimensions } from "react-native";

// 设计稿的宽度 / 元素的宽度 = 手机屏幕 / 手机中元素的宽度
// 推导出： 手机中元素的宽度 = 手机屏幕 * 元素的宽度 / 设计稿的宽度  1080(设计稿的宽度)

/**
 * 屏幕的宽度
 */
export const screenWidth = Dimensions.get("window").width;

/**
 * 屏幕的高度
 */
export const screenHeight = Dimensions.get("window").height;
console.log(screenWidth,screenHeight);
/**
 * 将像素转为dp
 * @param {Number} elePx 元素的宽度或者高度   单位: px
 * @returns
 */
export const pxToDp = (elePx,type) => {
    const pt = type == "h" ? ((screenHeight * elePx) / 1920) : ((screenWidth * elePx) / 1080);
    if (pt % 2 == 0) return pt + 1;
    else return pt;
};

//使用pxToDp('元素的宽度')
