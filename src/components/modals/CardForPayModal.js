import AsyncStorage from "@react-native-async-storage/async-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { View, Text, StyleSheet } from "react-native";
import uuid from 'react-native-uuid';
import { Image } from 'expo-image';
import { useState } from "react";

import CardDataInputs from "../CardDataInputs";
import ModalContainer from "./ModalContainer";

import { cardNumberFormat, expDateFormat } from "../../helpers";
import valid from "card-validator";




const CardForPayModal = ({ address, date, time, total, modalVisible, setModalVisible, setErrorModal }) => {

    const [cardholder, setCardholder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [checked, setChecked] = useState(false);


    const onPay = async () => {

        if (!valid.cardholderName(cardholder).isValid) return setErrorMessage('invalid cardholder name');
        if (!valid.number(cardNumber).isValid) return setErrorMessage('invalid card number');
        if (!valid.expirationDate(expDate).isValid) return setErrorMessage('invalid expiration date');
        if (!valid.cvv(cvv).isValid) return setErrorMessage('invalid CVV');

        // save card data if checked
        if (checked) {
            const card = {
                blocked: false,
                cardholder,
                cardNumber,
                expDate,
                cvv,
                id: uuid.v4()
            };

            try {
                const cardsList = await AsyncStorage.getItem("cards");

                if (!cardsList) {

                    const cardsArrToString = JSON.stringify([card]);
                    await AsyncStorage.setItem("cards", cardsArrToString);

                } else {

                    const cardsArr = JSON.parse(cardsList);

                    const newCardsArrToString = JSON.stringify([...cardsArr, card]);
                    await AsyncStorage.setItem("cards", newCardsArrToString);

                }

            } catch (error) {
                await AsyncStorage.removeItem("cards");
            }
        }

        // payment code


        // if payment  declined
        if (false) {
            setModalVisible(!modalVisible)
            return setErrorModal(true)
        }

        // if payment succeeded - save payment info
        const paymentData = {
            address,
            date,
            time,
            total,
            id: uuid.v4()
        };

        try {
            const paymentsList = await AsyncStorage.getItem("payments");

            if (!paymentsList) {

                const paymentsArrToString = JSON.stringify([paymentData]);
                await AsyncStorage.setItem("payments", paymentsArrToString);

            } else {

                const paymentsArr = JSON.parse(paymentsList);

                const newPaymentsArrToString = JSON.stringify([...paymentsArr, paymentData]);
                await AsyncStorage.setItem("payments", newPaymentsArrToString);
            }

        } catch (error) {
            await AsyncStorage.removeItem("payments");
        }

        setModalVisible(!modalVisible);

        //clean up inputs
        setCardholder('')
        setCardNumber('')
        setExpDate('')
        setCvv('')
    }

    return (
        <ModalContainer
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            action={onPay}
            buttonText="pay"
            secondary
        >
            <View style={styles.address}>
                <Image style={styles.iconSize} source={require("../../../assets/images/icons/locationDark.svg")} />
                <Text style={styles.addressText}>{address}</Text>
            </View>
            <View style={styles.data}>
                <Text style={styles.dataText}>{date}</Text>
                <Text style={styles.dataText}>{time}</Text>
            </View>
            <Text style={styles.error}>{errorMessage}</Text>
            <CardDataInputs
                cardholder={cardholder} setCardholder={value => setCardholder(value.toUpperCase())}
                cardNumber={cardNumber} setCardNumber={value => cardNumberFormat(value, setCardNumber)}
                expDate={expDate} setExpDate={value => expDateFormat(value, setExpDate)}
                cvv={cvv} setCvv={setCvv}
            />
            <BouncyCheckbox
                size={13}
                fillColor="#4FA4FB"
                unfillColor="#FFFFFF"
                text="Save my details for future purchases"
                iconStyle={styles.iconStyle}
                innerIconStyle={styles.innerIconStyle}
                textStyle={styles.checkboxText}
                isChecked={checked}
                onPress={setChecked}
            />
            <View style={styles.total}>
                <Text style={styles.totalText}>Total amount</Text>
                <Text style={styles.totalAmount}>{total}$</Text>
            </View>
        </ModalContainer>
    )
}


const styles = StyleSheet.create({
    iconSize: {
        width: 18,
        height: 22
    },
    address: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    addressText: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 20,
        color: "#333333",
    },
    data: {
        flexDirection: "row",
        gap: 28,
        marginLeft: 28,
    },
    dataText: {
        color: "#8F8F8F",
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 17,
    },
    error: {
        textAlign: "center",
        textTransform: "capitalize",
        fontSize: 15,
        fontWeight: 600,
        color: "#FC3C3C",
        paddingVertical: 5
    },
    iconStyle: {
        borderColor: "#4FA4FB"
    },
    innerIconStyle: {
        borderWidth: 1,
        borderRadius: 4
    },
    checkboxText: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 14,
        color: "#333333",
        textDecorationLine: "none",
    },
    total: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F8F8F8",
        borderRadius: 28,
        padding: 24,
        marginTop: 24
    },
    totalText: {
        color: "#333333",
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 20,
    },
    totalAmount: {
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 20,
        color: "#333333",
    }
})

export default CardForPayModal 