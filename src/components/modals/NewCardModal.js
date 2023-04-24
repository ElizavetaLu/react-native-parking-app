import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, StyleSheet } from "react-native";
import { useState } from "react";
import CardDataInputs from "../CardDataInputs";
import ModalContainer from "./ModalContainer";
import { cardNumberFormat, expDateFormat } from '../../helpers';
import uuid from 'react-native-uuid';
import valid from "card-validator";


const NewCardModal = ({ setCards, modalVisible, setModalVisible }) => {

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

                if (setCards) setCards([card]);
                setModalVisible(false);


            } else {

                const cardsArr = JSON.parse(cardsList);

                const cardsArrToString = JSON.stringify([...cardsArr, card]);
                await AsyncStorage.setItem("cards", cardsArrToString);

                if (setCards) setCards([...cardsArr, card]);
                setModalVisible(false);

            }

        } catch (error) {
            await AsyncStorage.removeItem("cards");
        }

        setCardholder('');
        setCardNumber('');
        setExpDate('');
        setCvv('');
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
                cardNumber={cardNumber} setCardNumber={value => cardNumberFormat(value, setCardNumber)}
                expDate={expDate} setExpDate={value => expDateFormat(value, setExpDate)}
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