import { ImageBackground, View, StyleSheet, Text, Image } from "react-native";
import NewCardModal from "../components/modals/NewCardModal";
import Button from "../components/buttons/Button";
import Header from "../components/Header";
import { useState } from "react";

const PaymentsEmptyScreen = (setCards) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.darkBackground}>
            <View style={styles.lightArea}>
                <ImageBackground source={require("../../assets/images/backgrounds/paymentBG.png")} resizeMode="cover" style={styles.backgroundImage}>

                    <NewCardModal setCards={setCards} modalVisible={modalVisible} setModalVisible={setModalVisible} />

                    <Header title="my cards" />

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
    },
    title: {
        maxWidth: 300,
        marginStart: 16,
        color: "#333333",
        textTransform: "uppercase",
        marginTop: 84,
        fontSize: 48,
        fontWeight: 800,
        lineHeight: 67,
        flex: 1
    }
})

export default PaymentsEmptyScreen