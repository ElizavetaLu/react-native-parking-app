import { ImageBackground, View, StyleSheet, Text, Image } from "react-native";
import { useState } from "react";
import Button from "../components/buttons/Button";
import NewCardModal from "../components/modals/NewCardModal";
import Header from "../components/Header";

const CardsEmptyScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.darkBackground}>
            <View style={styles.lightArea}>
                <ImageBackground source={require("../../assets/images/paymentBG.png")} resizeMode="cover" style={styles.backgroundImage}>
                    <NewCardModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigate={navigation.navigate} />

                    <Header title="my cards" />

                    <Text style={styles.title}>You have no added cards</Text>
                    <Image style={styles.image} source={require("../../assets/images/halfCard.png")} />
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
        right: 0,
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

export default CardsEmptyScreen