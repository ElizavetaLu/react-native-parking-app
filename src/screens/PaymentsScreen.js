import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from "react";
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'expo-image';

import RoundedContainer from "../components/RoundedContainer";
import NewCardModal from "../components/modals/NewCardModal";
import PaymentInfo from "../components/PaymentInfo";
import Button from "../components/buttons/Button";
import DummyText from "../components/DummyText";
import Header from "../components/Header";
import Card from "../components/Card";

import { updateCards, updatePayments } from "../helpers";

import SignUpPhoneModal from "../components/modals/SignUpPhoneModal";
import SignUpCodeModal from "../components/modals/SignUpCodeModal";
import PaginationItem from "../components/PaginationItem"; 


const width = Dimensions.get('window').width;
const parallaxScrollingOffset = width < 410 ? width / 3 : 200; 

const PaymentsScreen = () => {

    const [token, setToken] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then(res => setToken(res))
            .catch(err => console.log(err))
    }, [])


    const [phoneModal, setPhoneModal] = useState(false);
    const [codeModal, setCodeModal] = useState(false); 
    const [addCardModal, setAddCardModal] = useState(false);


    const [cards, setCards] = useState([]);
    const [payments, setPayments] = useState([]);


    const [currentCard, setCurrentCard] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const onCarouselItemChange = (index) => {
        setCurrentCard(cards[index]);
        setCurrentCardIndex(index);
    }

    useEffect(() => {
        updateCards(setCards);
        updatePayments(setPayments);
    }, [])


    useFocusEffect(
        useCallback(() => {
            updateCards(setCards)
            updatePayments(setPayments)
        }, [setCards, setPayments])
    );

    return (
        <RoundedContainer>

            <NewCardModal
                setCards={setCards}
                modalVisible={addCardModal}
                setModalVisible={setAddCardModal}
            />

            <SignUpPhoneModal modalVisible={phoneModal} setModalVisible={setPhoneModal} openNextModal={setCodeModal} />
            <SignUpCodeModal modalVisible={codeModal} setModalVisible={setCodeModal} setToken={setToken} />

            <Header title="my cards" />

            <View >
                {cards.length < 1
                    ? <View style={styles.dummyContainer}>
                        <DummyText text="You have no added cards" />
                        <Image style={styles.dummyCardImage} source={require("../../assets/images/creditCard.png")} />
                    </View>

                    : <Carousel
                        loop={false}
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.95,
                            parallaxScrollingOffset
                        }}
                        style={{ alignSelf: cards.length === 1 ? "center" : null }}
                        height={300}
                        width={cards.length === 1 ? 230 : width}

                        data={cards}
                        renderItem={({ item }) => (
                            <Card
                                key={item.id}
                                blocked={item.blocked}
                                cardNumber={item.cardNumber}
                                expDate={item.expDate}
                            />
                        )}
                        onSnapToItem={onCarouselItemChange}
                    />
                }

                < View style={styles.paginationContainer}  >
                    {
                        cards.map((item, index) => {
                            return (
                                <PaginationItem 
                                    currentIndex={currentCardIndex}
                                    index={index}
                                    key={index} 
                                />)
                        })
                    }
                </ View>

                <Text style={styles.title}>Payments</Text>

                <FlatList
                    ListFooterComponent={<View style={styles.listFooter}></View>}
                    ListEmptyComponent={<DummyText text="Your payment history is empty" />}

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
                {token
                    ? <Button text="add card" onPress={() => setModalVisible(!modalVisible)} primary />
                    : <Button text="sign in" onPress={() => setPhoneModal(!phoneModal)} primary />}
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
    listFooter: {
        height: 100
    },
    dummyContainer: {
        alignItems: "center",
        gap: 20
    },
    dummyCardImage: {
        width: 315,
        height: 195.81
    },
    paginationContainer: {
        flexDirection: "row",
        gap: 6,
        justifyContent: "center",
        width: "90%",
        alignSelf: "center"
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