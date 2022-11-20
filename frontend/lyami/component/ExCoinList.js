import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Text, Image, Center,
    Button, Flex, Modal, useToast, HStack, Input, ScrollView,
} from 'native-base';
import Icons from "../asset/Icon.js";
import global from '../api/util/global';
import { Pressable } from 'react-native';

function requestForPaymentClick(navigation) {
    navigation.navigate('Payment', {});
}


const selectClickHandler = () => {

}
const changeValueHandler = () => {

}
// 代币列表
const ExCoinList = (props) => {
    const { type } = props
    const navigation = useNavigation();
    const toast = useToast();
    const { showModal, setShowModal } = props
    const [coinListData, setCoinListData] = useState(global.nativeCoinNetwork)
    const [inputValue, setInputValue] = useState('')
    return (
        <>
            <Modal isOpen={showModal} size='full' onClose={() => setShowModal(false)}>
                <Modal.Content  {...styles.bottom} >
                    <Modal.CloseButton />
                    <Modal.Body>
                        <Center _text={{
                            color: 'black',
                            fontWeight: '500',
                            paddingBottom: 8,
                        }}>
                            {type === 'from' ? '转换自' : '转换为'}
                        </Center>
                        <Center>
                            <HStack>
                                <Input
                                    type="text"
                                    w="100%"
                                    value={inputValue}
                                    placeholder='搜索代币'
                                    onChangeText={(text) => changeValueHandler({ text, setInputValue, setCoinListData })}
                                    InputLeftElement={<Image alt='img' source={Icons.inputSearchIcon} size='5' marginLeft='3' />}
                                />
                            </HStack>
                        </Center>
                        <ScrollView maxH='340' mt='4'>
                            {global.nativeCoinNetwork.map((item, index) => {
                                return (
                                    <Pressable key={item.name} w='100%' _text={{ color: 'blue.500' }} variant="Unstyled" onPress={() => selectClickHandler(navigation, item)}>
                                        <HStack {...styles.coinList}>
                                            <Flex direction='row' alignItems='center' >
                                                <Image alt='img' marginLeft='2' marginRight='4' source={Icons.usdtIcon} size='6' />
                                                <Text color='#707070'>{`${index}${item.name} (${item.CoinSymbol})`}</Text>
                                            </Flex>
                                            <Text>2</Text>
                                        </HStack>
                                    </Pressable>
                                )
                            })}
                        </ScrollView>
                    </Modal.Body>

                </Modal.Content>
            </Modal>
        </>
    )
}

export default React.memo(ExCoinList)

const styles = {
    bottom: {
        marginTop: "auto",
        borderRadius: 0,
    },
    coinList: {
        borderStyle: 'solid',
        // borderWidth: 1,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        borderColor: '#cdcdcd',
        height: '16',
        direction: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}