import { View, FlatList, Text, StyleSheet, Image, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoundedContainer from "../components/RoundedContainer";
import NewCardModal from "../components/modals/NewCardModal";
import { useEffect, useState } from "react";
import Carousel from 'react-native-reanimated-carousel';
import PaymentInfo from "../components/PaymentInfo";
import Button from "../components/buttons/Button";
import Header from "../components/Header";
import Card from "../components/Card";


const PaymentsScreen = () => {

    const width = Dimensions.get('window').width;

    const [modalVisible, setModalVisible] = useState(false);

    const [cards, setCards] = useState([]);
    const [payments, setPayments] = useState([]);

    const [currentCard, setCurrentCard] = useState(null);


    useEffect(() => {
        AsyncStorage.getItem("cards")
            .then(res => {
                if (res) {
                    const cardsArr = JSON.parse(res);
                    setCards(cardsArr);
                }
            })
            .catch(error => AsyncStorage.removeItem("cards"))
    }, [])

    useEffect(() => {
        AsyncStorage.getItem("payments")
            .then(res => {
                if (res) {
                    const paymentsArr = JSON.parse(res);
                    setPayments(paymentsArr);
                }
            })
            .catch(error => AsyncStorage.removeItem("payments"))
    }, [])


    const onCarouselItemChange = (index) => {
        setCurrentCard(cards[index])
    }


    return (
        <RoundedContainer>
            <NewCardModal setCards={setCards} modalVisible={modalVisible} setModalVisible={setModalVisible} />

            <Header title="my cards" />

            <View >
                {cards.length < 1
                    ? <View style={styles.dumpContainer}>
                        <Text style={styles.dump}>You have no added cards</Text>
                        <Image source={require("../../assets/images/creditCard.png")} />
                    </View>
                    : <View style={{ alignItems: cards.length === 1 ? "center" : "none" }}>
                        <Carousel
                            loop={false}
                            mode="parallax"
                            modeConfig={{
                                parallaxScrollingScale: 0.95,
                                parallaxScrollingOffset: 200,
                            }}

                            height={300}
                            width={cards.length === 1 ? 230 : width}

                            data={cards}
                            renderItem={({ item, index }) => (
                                <Card
                                    key={item.id}
                                    blocked={item.blocked}
                                    cardNumber={item.cardNumber}
                                    expDate={item.expDate}
                                />
                            )}
                            onSnapToItem={onCarouselItemChange}
                        />
                    </View>
                }


                <Text style={styles.title}>Payments</Text>


                <FlatList
                    style={styles.payments}
                    data={payments}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={styles.verticalSeparator} />}
                    renderItem={({ item }) => {
                        return (
                            <PaymentInfo
                                address={item.address}
                                date={item.date}
                                time={item.time}
                                total={item.total}
                            />
                        )
                    }}
                />

            </View>
            <View style={styles.buttonContainer}>
                <Button text="add card" onPress={() => setModalVisible(!modalVisible)} primary />
            </View>
        </RoundedContainer>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 25,
        paddingLeft: 16,
        paddingBottom: 12,
        marginTop: 32,
    },
    payments: {
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