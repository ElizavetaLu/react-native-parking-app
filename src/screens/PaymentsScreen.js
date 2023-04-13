import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import RoundedContainer from "../components/RoundedContainer";
import NewCardModal from "../components/modals/NewCardModal";
import { useCallback, useEffect, useState } from "react";
import PaymentInfo from "../components/PaymentInfo";
import Button from "../components/buttons/Button";
import Header from "../components/Header";
import Card from "../components/Card";

const PaymentsScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const [cards, setCards] = useState([])

    useEffect(() => {
        AsyncStorage.getItem("cards")
            .then(res => {
                if (res) {
                    console.log(res)
                    const cardsArr = JSON.parse(res);
                    setCards(cardsArr);
                }
            })
            .catch(error => AsyncStorage.removeItem("cards"))

    }, [])
// console.log(cards)
    return (
        <RoundedContainer>
            <NewCardModal setCards={setCards} modalVisible={modalVisible} setModalVisible={setModalVisible} />

            <Header title="my cards" />

            <View style={styles.container}>
                {cards.length < 1
                    ? <View style={styles.dumpContainer}>
                        <Text style={styles.dump}>You have no added cards</Text>
                        <Image source={require("../../assets/images/creditCard.png")} />
                    </View>
                    : <FlatList
                        contentContainerStyle={styles.cardsContainer}
                        style={styles.cards}
                        horizontal
                        data={cards}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <View style={styles.horizontalSeparator} />}
                        renderItem={({ item }) => {
                            return (
                                <Card
                                    blocked={item.blocked}
                                    cardNumber={item.cardNumber}
                                    expDate={item.expDate}
                                />
                            )
                        }}
                    />
                }


                <Text style={styles.title}>Payments</Text>
                <FlatList
                    style={styles.payments}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    keyExtractor={item => item}
                    ItemSeparatorComponent={() => <View style={styles.verticalSeparator} />}
                    renderItem={({ item }) => <PaymentInfo />}
                />

                <View style={styles.buttonContainer}>
                    <Button text="add card" onPress={() => setModalVisible(!modalVisible)} primary />
                </View>
            </View>
        </RoundedContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardsContainer: {
        flexGrow: 1,
        height: 301,
        justifyContent: "center"
    },
    cards: {
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 25,
        paddingLeft: 16,
        paddingBottom: 12,
        marginTop: 32,
    },
    payments: {
        flex: 1,
        paddingHorizontal: 16,
    },
    horizontalSeparator: {
        width: 18
    },
    verticalSeparator: {
        height: 16
    },
    dumpContainer: {
        alignItems: "center",
        gap: 20
    },
    dump: {
        textAlign: "center",
        color: "#8F8F8F",
        fontSize: 12,
        fontWeight: 400
    },
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        height: 121,
        backgroundColor: "rgba(255, 255, 255, 0.48)",
        justifyContent: "center",
        borderBottomEndRadius: 32,
        borderBottomStartRadius: 32,
    }
})


export default PaymentsScreen