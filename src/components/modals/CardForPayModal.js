import { View, Text, Image, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CardDataInputs from "../CardDataInputs";
import ModalContainer from "./ModalContainer";
import { useState } from "react";

const CardForPayModal = ({ modalVisible, setModalVisible }) => {

    const [checked, setChecked] = useState(false);

    const onPay = () => {
        // onPay press code


        // save card data
        if (checked) { }
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
                <Image source={require("../../../assets/images/icons/locationDark.png")} />
                <Text style={styles.addressText}>Lvivska Str. Parking Forum Lviv</Text>
            </View>

            <View style={styles.data}>
                <Text style={styles.dataText}>Jun 12, 2022</Text>
                <Text style={styles.dataText}>12:40-13:40</Text>
            </View>

            <CardDataInputs />

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
                <Text style={styles.totalAmount}>12$</Text>
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
        marginBottom: 20,
    },
    dataText: {
        color: "#8F8F8F",
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 17,
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