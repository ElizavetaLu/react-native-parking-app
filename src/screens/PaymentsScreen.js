import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, FlatList, Text, StyleSheet } from "react-native";
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

    const getCards = useCallback(
        async () => {
            try {
                const cards = await AsyncStorage.getItem("cards");

                if (cards) {
                    const cardsArr = JSON.parse(cards);
                    setCards(cardsArr);
                }

            } catch (error) {
                await AsyncStorage.removeItem("cards");
            }
        },
        [cards]
    );

    // useEffect(() => {
    //     getCards();
    // }, [cards])


    return (
        <RoundedContainer>
            <NewCardModal setCards={setCards} modalVisible={modalVisible} setModalVisible={setModalVisible} />

            <Header title="my cards" />

            <View style={styles.container}>
                {cards.length < 1 && <Text style={styles.dump}>You have no added cards</Text>}

                <FlatList
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

                <Text style={styles.title}>Payments</Text>
                <FlatList
                    style={styles.payments}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    keyExtractor={item => item}
                    ItemSeparatorComponent={() => <View style={styles.verticalSeparator} />}
                    renderItem={({ item }) => <PaymentInfo />}
                />

                <Button text="add card" onPress={() => setModalVisible(!modalVisible)} primary />
            </View>
        </RoundedContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 28,
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
        marginBottom: 26
    },
    horizontalSeparator: {
        width: 18
    },
    verticalSeparator: {
        height: 16
    },
    dump: {
        textAlign: "center",
        color: "#8F8F8F",
        fontSize: 12,
        fontWeight: 400
    }
})


export default PaymentsScreen