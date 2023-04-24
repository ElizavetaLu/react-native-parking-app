import { View, FlatList, Text, StyleSheet, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel from 'react-native-reanimated-carousel';
import { NavigationEvents } from "react-navigation";
import { useEffect, useState } from "react";

import RoundedContainer from "../components/RoundedContainer";
import NewCardModal from "../components/modals/NewCardModal";
import PaymentsEmptyScreen from "./PaymentsEmptyScreen";
import PaymentInfo from "../components/PaymentInfo";
import Button from "../components/buttons/Button";
import DummyText from "../components/DummyText";
import Header from "../components/Header";
import Card from "../components/Card";

import { updateCards, updatePayments } from "../helpers";

import SignUpPhoneModal from "../components/modals/SignUpPhoneModal";
import SignUpCodeModal from "../components/modals/SignUpCodeModal";

const PaymentsScreen = () => {

    const [token, setToken] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then(res => setToken(res))
            .catch(err => console.log(err))
    }, [])

    const [phoneModal, setPhoneModal] = useState(false);
    const [codeModal, setCodeModal] = useState(false);


    const width = Dimensions.get('window').width;

    const [modalVisible, setModalVisible] = useState(false);

    const [cards, setCards] = useState([]);
    const [payments, setPayments] = useState([]);

    const [currentCard, setCurrentCard] = useState(null);

    const onCarouselItemChange = (index) => {
        setCurrentCard(cards[index]);
    }

    useEffect(() => {
        updateCards(setCards);
        updatePayments(setPayments);
    }, [])

    return (
        <>
            {cards.length > 0 || payments.length > 0
                ? <RoundedContainer>
                    <NavigationEvents onDidFocus={() => {
                        updateCards(setCards)
                        updatePayments(setPayments)
                    }} />

                    <NewCardModal
                        setCards={setCards}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />

                    <SignUpPhoneModal modalVisible={phoneModal} setModalVisible={setPhoneModal} openNextModal={setCodeModal} />
                    <SignUpCodeModal modalVisible={codeModal} setModalVisible={setCodeModal} setToken={setToken} />

                    <Header title="my cards" />

                    <View >
                        {cards.length < 1
                            ? <View style={styles.dummyContainer}>
                                <DummyText text="You have no added cards" />
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


                        {payments.length > 0
                            ? <FlatList
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

                            : <DummyText text="Your payment history is empty" />
                        }

                    </View>
                    <View style={styles.buttonContainer}>
                        {token
                            ? <Button text="add card" onPress={() => setModalVisible(!modalVisible)} primary />
                            : <Button text="sign in" onPress={() => setPhoneModal(!phoneModal)} primary />}
                    </View>
                </RoundedContainer>

                : <PaymentsEmptyScreen setCards={setCards} />
            }
        </>
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
    dummyContainer: {
        alignItems: "center",
        gap: 20
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