import { Text, StyleSheet, View } from "react-native";
import ModalContainer from "./ModalContainer";
import { useState } from "react";
import Input from "../Input";

const SignUpPhoneModal = ({ modalVisible, setModalVisible, openNextModal }) => {

    const [number, setNumber] = useState('');

    const onButtonPress = () => {
        //sign up code

        //close current modal
        setModalVisible(!modalVisible);

        //open next modal
        openNextModal(true);
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

            <Input value={number} onChange={setNumber} label="Phone Number" />

            <View style={{ marginBottom: 17 }}></View>
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
    }
})

export default SignUpPhoneModal 