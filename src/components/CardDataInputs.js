import { View, StyleSheet } from "react-native";
import Input from "./Input";

const CardDataInputs = ({
    cardholder,
    setCardholder,
    cardNumber,
    setCardNumber,
    expDate,
    setExpDate,
    cvv,
    setCvv
}) => {

    return (
        <View style={styles.inputsContainer}>
            <Input value={cardholder} onChange={setCardholder} label="Cardholder Name" upperCase />
            <Input value={cardNumber} onChange={setCardNumber} label="Card Number" maxLength={19} />

            <View style={styles.inputsRow}>

                <View style={styles.expInputContainer}>
                    <Input value={expDate} onChange={setExpDate} label="Expire Date" maxLength={5} />
                </View>
                <Input  value={cvv} onChange={setCvv} label="CVV" maxLength={3} />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputsContainer: {
        gap: 16,
        marginBottom: 12,
    },
    expInputContainer: {
        flexGrow: 3
    },
    inputsRow: {
        flexDirection: "row",
        gap: 13
    },
})

export default CardDataInputs