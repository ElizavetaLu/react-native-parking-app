import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, StyleSheet } from "react-native";
import CardDataInputs from "../CardDataInputs";
import ModalContainer from "./ModalContainer";
import uuid from 'react-native-uuid';
import valid from "card-validator";
import { useState } from "react";


const NewCardModal = ({setCards, modalVisible, setModalVisible }) => {

    const [cardholder, setCardholder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const onAdd = async () => {

        if (!valid.cardholderName(cardholder).isValid) return setErrorMessage('invalid cardholder name');
        if (!valid.number(cardNumber).isValid) return setErrorMessage('invalid card number');
        if (!valid.expirationDate(expDate).isValid) return setErrorMessage('invalid expiration date');
        if (!valid.cvv(cvv).isValid) return setErrorMessage('invalid CVV');


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

                setCards([card]);
                setModalVisible(false);


            } else {

                const cardsArr = JSON.parse(cardsList);

                const cardsArrToString = JSON.stringify([...cardsArr, card]);
                await AsyncStorage.setItem("cards", cardsArrToString);

                setCards([...cardsArr, card]);
                setModalVisible(false);

            }

        } catch (error) {
            await AsyncStorage.removeItem("cards");
        }

        cardholder('')
        cardNumber('')
        expDate('')
        cvv('')
    }


    const cardNumberFormat = value => {

        if (isNaN(value.split(' ').join(''))) return;

        const v = value
            .replace(/\s+/g, "")
            .replace(/[^0-9]/gi, "")
            .substr(0, 16);

        const parts = [];

        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.substr(i, 4));
        }

        setCardNumber(parts.length > 1 ? parts.join(" ") : value);
    }


    const formatExpDate = value => {

        if (isNaN(value.split('/').join(''))) return;

        const formattedValue = value.replace(
            /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
        ).replace(
            /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
        ).replace(
            /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
        ).replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
        ).replace(
            /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
        ).replace(
            /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
        ).replace(
            /\/\//g, '/' // Prevent entering more than 1 `/`
        );

        setExpDate(formattedValue);
    }



    return (
        <ModalContainer
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            action={onAdd}
            buttonText="Add"
            secondary
        >
            <Text style={styles.title}>Add New Card</Text>
            <Text style={styles.text}>Add new card and use it for your payments</Text>
            <Text style={styles.error}>{errorMessage}</Text>

            <CardDataInputs
                cardholder={cardholder} setCardholder={(value) => setCardholder(value.toUpperCase())}
                cardNumber={cardNumber} setCardNumber={value => cardNumberFormat(value)}
                expDate={expDate} setExpDate={value => formatExpDate(value)}
                cvv={cvv} setCvv={setCvv}
            />

        </ModalContainer >
    )
}


const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        textTransform: "capitalize",
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 25,
        color: "#333333",
        marginBottom: 8
    },
    text: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 20,
        color: "#333333"
    },
    error: {
        textAlign: "center",
        textTransform: "capitalize",
        fontSize: 15,
        fontWeight: 600,
        color: "#FC3C3C",
        paddingVertical: 10
    }
})

export default NewCardModal 