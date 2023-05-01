import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ModalContainer from "./ModalContainer";
import { Image } from 'expo-image';
import { useState } from "react";


const PaymentModal = ({ address, date, time, total, modalVisible, setModalVisible, showNextModal }) => {

    const [paymentType, setPaymentType] = useState('card');
    const selectedTypeBg = type => paymentType === type ? "#333" : "#fff";
    const selectedTypeText = type => paymentType === type ? "#fff" : "#333";


    const onNext = () => {

        if (paymentType === 'card') {

            setModalVisible(!modalVisible);
            showNextModal(true);
        } else {

            //pay by apple/google
            setModalVisible(!modalVisible);
        }
    }

    return (
        <ModalContainer
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            action={onNext}
            buttonText="next"
            secondary
        >
            <View style={styles.address}>
                <Image style={styles.locationIcon} source={require("../../../assets/images/icons/locationDark.svg")} />
                <Text style={styles.addressText}>{address}</Text>
            </View>

            <View style={styles.data}>
                <Text style={styles.dataText}>{date}</Text>
                <Text style={styles.dataText}>{time}</Text>
            </View>

            <Image style={styles.qr} source={require("../../../assets/images/qr.png")} />
            <Image style={styles.barcode} source={require("../../../assets/images/barcode.png")} />

            <View style={styles.buttons}>
                <TouchableOpacity activeOpacity={0.8} style={[styles.button, { backgroundColor: selectedTypeBg('apple') }]} onPress={() => setPaymentType('apple')}>
                    <Image style={styles.paymentIcon} source={require("../../../assets/images/icons/applePay.png")} />
                    <Text style={[styles.buttonText, { color: selectedTypeText('apple') }]}>Pay</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={[styles.button, { backgroundColor: selectedTypeBg('google') }]} onPress={() => setPaymentType('google')}>
                    <Image style={styles.paymentIcon} source={require("../../../assets/images/icons/googlePay.png")} />
                    <Text style={[styles.buttonText, { color: selectedTypeText('google') }]}>Pay</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={[styles.button, { backgroundColor: selectedTypeBg('card') }]} onPress={() => setPaymentType('card')}>
                    <Text style={[styles.buttonText, { color: selectedTypeText('card') }]}>Card</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.total}>
                <Text style={styles.totalText}>Total amount</Text>
                <Text style={styles.totalAmount}>{total}$</Text>
            </View>
        </ModalContainer>
    )
}

const styles = StyleSheet.create({
    address: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    locationIcon: {
        width: 18,
        height: 22
    },
    paymentIcon: {
        width: 22,
        height: 22
    },
    addressText: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 20,
    },
    data: {
        flexDirection: "row",
        gap: 28,
        marginLeft: 28
    },
    dataText: {
        color: "#8F8F8F",
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 17,
    },
    qr: {
        marginTop: 16,
        alignSelf: "center",
        width: 185,
        height: 185
    },
    barcode: {
        marginTop: 26.88,
        alignSelf: "center",
        width: 185,
        height: 70
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 14,
        marginVertical: 24,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#00000014",
        borderRadius: 18,
        paddingHorizontal: 18,
        paddingVertical: 13,
        gap: 2
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 600
    },
    total: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F8F8F8",
        borderRadius: 28,
        padding: 24
    },
    totalText: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 20,
    },
    totalAmount: {
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 20
    },
    btnContainer: {
        alignSelf: 'center',
        position: "absolute",
        bottom: -26,
    }
});

export default PaymentModal