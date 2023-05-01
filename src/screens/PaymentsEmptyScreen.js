import { ImageBackground, View, StyleSheet, Text } from "react-native";
import { Image } from 'expo-image';
import { useState } from "react";

import NewCardModal from "../components/modals/NewCardModal";
import Button from "../components/buttons/Button";


const PaymentsEmptyScreen = (setCards) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.darkBackground}>
            <View style={styles.lightArea}>
                <ImageBackground source={require("../../assets/images/backgrounds/paymentBG.png")} resizeMode="cover" style={styles.backgroundImage}>

                    <NewCardModal setCards={setCards} modalVisible={modalVisible} setModalVisible={setModalVisible} />

                    <Text style={styles.title}>You have no added cards</Text> 

                    <Image style={styles.image} source={require("../../assets/images/creditCard.png")} />

                    <Button text="add card" onPress={() => setModalVisible(true)} primary />
                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    lightArea: {
        flex: 1,
        backgroundColor: "#fff",
        borderBottomEndRadius: 32,
        borderBottomStartRadius: 32,
        paddingBottom: 28
    },
    darkBackground: {
        flex: 1,
        backgroundColor: "#333333"
    },
    container: {
        borderBottomEndRadius: 32,
        borderBottomStartRadius: 32,
        flex: 1,
        backgroundColor: "#fff",
    },
    backgroundImage: {
        flex: 1,
        paddingTop: 60
    },
    image: {
        position: "absolute",
        right: -120,
        top: "60%",
        width: 315,
        height: 195.81
    },
    title: {
        maxWidth: 300,
        marginStart: 16,
        color: "#333333",
        textTransform: "uppercase",
        marginTop: "10%",
        fontSize: 48,
        fontWeight: 800,
        lineHeight: 67,
        flex: 1
    }
})

export default PaymentsEmptyScreen