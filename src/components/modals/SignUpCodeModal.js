import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import { useRef, useState } from "react";

import ModalContainer from "./ModalContainer";


const SignUpCodeModal = ({ modalVisible, setModalVisible, setToken }) => {

    const [onFocuse, setOnFocuse] = useState(1);

    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();

    const [input1Value, setInput1Value] = useState('');
    const [input2Value, setInput2Value] = useState('');
    const [input3Value, setInput3Value] = useState('');
    const [input4Value, setInput4Value] = useState('');

    const borderBottomColor = number => onFocuse === number || number < onFocuse ? "#464646" : "#DEDDDD";

    const onButtonPress = async () => {
        const code = input1Value + input2Value + input3Value + input4Value;

        // sign up code

        //close popup
        if (true) {

            const token = '123test'

            await AsyncStorage.setItem("token", token);

            setToken(token)
            setModalVisible(!modalVisible);
        }
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
            <Text style={styles.text}>We have sent you a code, please enter it below</Text>


            <View style={styles.inputs}>
                <TextInput
                    autoFocus
                    maxLength={1}
                    style={[styles.input, { borderBottomColor: borderBottomColor(1) }]}

                    value={input1Value}
                    onChangeText={val => {
                        if (isNaN(val)) return
                        input2.current.focus();
                        setOnFocuse(2);
                        setInput1Value(val)
                    }}
                />
                <TextInput
                    maxLength={1}
                    style={[styles.input, { borderBottomColor: borderBottomColor(2) }]}
                    ref={input2}

                    value={input2Value}
                    onChangeText={val => {
                        if (isNaN(val)) return
                        input3.current.focus();
                        setOnFocuse(3);
                        setInput2Value(val)
                    }}
                />
                <TextInput
                    maxLength={1}
                    style={[styles.input, { borderBottomColor: borderBottomColor(3) }]}
                    ref={input3}


                    value={input3Value}
                    onChangeText={val => {
                        if (isNaN(val)) return
                        input4.current.focus();
                        setOnFocuse(4);
                        setInput3Value(val)
                    }}
                />
                <TextInput
                    maxLength={1}
                    style={[styles.input, { borderBottomColor: borderBottomColor(4) }]}
                    ref={input4}

                    value={input4Value}
                    onChangeText={val => {
                        if (isNaN(val)) return
                        setInput4Value(val)
                    }}
                />
            </View>

        </ModalContainer>
    )
}


const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 25,
        color: "#333333",
        marginBottom: 4,
    },
    text: {
        textAlign: "center",
        alignSelf: "center",
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        color: "#333333",
        marginBottom: 24,
        maxWidth: 213
    },
    inputs: {
        alignSelf: "center",
        flexDirection: "row",
        marginBottom: 17
    },
    input: {
        outlineStyle: "none",
        borderBottomWidth: 1,
        textAlign: "center",
        width: 40,
        fontSize: 24,
        fontWeight: '600',
        marginHorizontal: 12
    },
})

export default SignUpCodeModal 