import React, { useState } from "react";
import { VStack, Modal, Button, Text, HStack, SafeAreaView, Image, View } from "native-base";

import CrystalBallComponent from './index'

export default function TestCrystalBall() {
    return (
        <View>
            <CrystalBallComponent width="300" height="350" gene="JQ00TBZNVAY0WFM2IWG24Y1FPL1Z4KMSUOTS"></CrystalBallComponent>
        </View>
    )
}