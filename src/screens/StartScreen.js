import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import SignUpPhoneModal from "../components/modals/SignUpPhoneModal"
import SignUpCodeModal from "../components/modals/SignUpCodeModal"


const StartScreen = ({navigation}) => {

    const [phoneModal, setPhoneModal] = useState(false);
    const [codeModal, setCodeModal] = useState(false);

    return (
        <ImageBackground source={require("../../assets/images/mainBG.png")} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <Text style={styles.title}>pay for parking directly in the app</Text>

                <SignUpPhoneModal modalVisible={phoneModal} setModalVisible={setPhoneModal} openNextModal={setCodeModal} />
                <SignUpCodeModal modalVisible={codeModal} setModalVisible={setCodeModal} navigate={()=>navigation.navigate('Profile')}/>

                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => setPhoneModal(true)}>
                    <Text style={styles.buttonText}> Get Started</Text>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

StartScreen.navigationOptions = () => ({ tabBarVisible: false })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        margin: 16,
        marginBottom: 42,
        gap: 39,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: "#333333",
        lineHeight: 98,
        fontSize: 70,
        fontWeight: 700,
        textTransform: "uppercase",
        maxWidth: 330
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#333333",
        borderRadius: 30,
        paddingVertical: 13,
        paddingHorizontal: 24,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 500,
    }
})

export default StartScreen