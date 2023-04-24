import { Text, StyleSheet, View } from "react-native";
import { useState } from "react";
import ModalContainer from "./ModalContainer";
import Input from "../Input";

const SignUpPhoneModal = ({ modalVisible, setModalVisible, openNextModal }) => {

    const [number, setNumber] = useState('+ ');

    const onButtonPress = () => {
        //sign up code

        //close current modal
        setModalVisible(!modalVisible);

        //open next modal
        openNextModal(true);
    }

    const onPhoneChange = (value) => {
        if (isNaN(value.slice(1))) return;
        setNumber(value)
    }


    return (
        <ModalContainer
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            action={onButtonPress}
            buttonText="next"
            secondary
        >
            <Text style={styles.title}>Sign Up</Text>


            <Text style={styles.text}>Please enter your Phone number</Text>

            <Input
                value={number}
                onChange={onPhoneChange}
                label="Phone Number"
                maxLength={15}
            />

            <View style={styles.separator}></View>
        </ModalContainer>
    )
}


const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 25,
        color: "#333333",
        marginBottom: 4
    },
    text: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        color: "#333333",
        marginBottom: 24
    },
    separator: {
        marginBottom: 17
    }
})

export default SignUpPhoneModal 