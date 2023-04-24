import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useState } from 'react';
import SignUpPhoneModal from '../components/modals/SignUpPhoneModal';
import SignUpCodeModal from '../components/modals/SignUpCodeModal';
import Separator from '../components/Separator';
import Button from '../components/buttons/Button';


const UnAuthProfileScreen = ({ setToken }) => {

    const [phoneModal, setPhoneModal] = useState(false);
    const [codeModal, setCodeModal] = useState(false);

    return (
        <View style={styles.unAuthWrapper}>
            <View style={styles.unAuthContainer}>

                <SignUpPhoneModal modalVisible={phoneModal} setModalVisible={setPhoneModal} openNextModal={setCodeModal} />
                <SignUpCodeModal modalVisible={codeModal} setModalVisible={setCodeModal} setToken={setToken} />


                <ImageBackground source={require("../../assets/images/backgrounds/paymentBG.png")} style={styles.background}>

                    <View style={styles.container}>
                        <View style={styles.block}>
                            <Text style={styles.title}>Don't have an account yet?</Text>

                            <Button text="sign up" onPress={() => setPhoneModal(true)} primary />

                        </View>

                        <Separator />

                        <View style={styles.block}>

                            <Button text="sign in" onPress={() => setPhoneModal(true)} primary />

                            <Text style={styles.title}>If already have one!</Text>
                        </View>
                    </View>

                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    unAuthWrapper: {
        flex: 1,
        backgroundColor: "#333333",
    },
    unAuthContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderBottomEndRadius: 32,
        borderBottomStartRadius: 32,
    },
    background: {
        flex: 1,
        paddingTop: 80
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        maxWidth: 350,
        textAlign: "center",
        color: "#333",
        textTransform: "uppercase",
        fontSize: 48,
        fontWeight: 800,
        lineHeight: 67
    },
    block: {
        gap: 20
    }
})


export default UnAuthProfileScreen