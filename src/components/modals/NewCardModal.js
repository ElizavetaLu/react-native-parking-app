import { Text, View, StyleSheet } from "react-native";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import Input from "../Input";


const NewCardModal = ({ modalVisible, setModalVisible }) => {

    const [cardholder, setCardholder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('');

    const onAdd = () => {
        //add new card code

        //navigate to payments screen
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

            <View style={styles.inputsContainer}>
                <Input value={cardholder} onChange={setCardholder} label="Cardholder Name" />
                <Input value={cardNumber} onChange={setCardNumber} label="Card Number"  maxLength={16}/>

                <View style={styles.inputsRow}>

                    <View style={{ flexGrow: 3 }}>
                        <Input value={expDate} onChange={setExpDate} label="Expire Date"  maxLength={5}/>
                    </View>
                    <Input value={cvv} onChange={setCvv} label="CVV" isPassword maxLength={3} />

                </View>
            </View>
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
    inputsContainer: {
        gap: 16,
        marginTop: 20,
        marginBottom: 12,
    },
    inputsRow: {
        flexDirection: "row",
        gap: 13
    },
})

export default NewCardModal 