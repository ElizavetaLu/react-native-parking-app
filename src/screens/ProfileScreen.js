import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUpPhoneModal from "../components/modals/SignUpPhoneModal";
import SignUpCodeModal from "../components/modals/SignUpCodeModal";
import RoundedContainer from "../components/RoundedContainer";
import { useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import SmallCard from "../components/SmallCard";
import Header from "../components/Header";
import Input from "../components/Input";


const isUserLogged = true;

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [phoneModal, setPhoneModal] = useState(false);
    const [codeModal, setCodeModal] = useState(false);

    const [cards, setCards] = useState([]);

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
    console.log('pipka')
    console.log(cards)

    const onDelete = async (id) => {
        try {
            const cardsList = await AsyncStorage.getItem("cards");

            if (cardsList) {
                const cardsArr = JSON.parse(cardsList);
                const newCardsArr = cardsArr.filter(item => item.id !== id);

                await AsyncStorage.setItem("cards", JSON.stringify(newCardsArr));
                setCards(newCardsArr);
            }

        } catch (error) {
            await AsyncStorage.removeItem("cards");
        }
    }

    return (
        <RoundedContainer>
            <View style={styles.container}>

                <Header title="my profile" />

                <SignUpPhoneModal modalVisible={phoneModal} setModalVisible={setPhoneModal} openNextModal={setCodeModal} />
                <SignUpCodeModal modalVisible={codeModal} setModalVisible={setCodeModal} />

                <View style={styles.profile}>
                    {isUserLogged
                        ? <>
                            <View style={styles.avatarContainer}>
                                <Image source={require("../../assets/images/icons/avatar.png")} />
                                <View style={styles.pencil}>
                                    <Image source={require("../../assets/images/icons/pencil.png")} />
                                </View>
                            </View>
                            <View style={styles.inputsContainer}>
                                <Input value={name} onChange={setName} label="Name" />
                                <Input value={phone} onChange={setPhone} label="Phone Number" maxLength={15} />
                                <Input value={email} onChange={setEmail} label="Email" />
                            </View>
                        </>
                        : < View style={styles.buttonContainer}>
                            <Button text="sign up" onPress={() => setPhoneModal(true)} primary />
                        </View >
                    }

                    <View style={styles.cards}>

                        <Header title="my cards" />


                        {cards.length < 1 && <Text style={styles.dump}>You have no added cards</Text>}

                        <FlatList
                            style={styles.list}
                            data={cards}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            renderItem={({ item }) => {
                                return (
                                    <SmallCard
                                        blocked={item.blocked}
                                        cardNumber={item.cardNumber}
                                        expDate={item.expDate}
                                        action={() => onDelete(item.id)}
                                    />
                                )
                            }}
                        />
                        <View style={styles.buttonContainer}>
                            <Button text="Delete Profile" onPress={() => { }} primary />
                        </View>
                    </View>

                </View>
            </View>
        </RoundedContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    profile: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center"
    },
    avatarContainer: {
        position: "relative",
        alignSelf: "center",
    },
    pencil: {
        position: "absolute",
        backgroundColor: "#4FA4FB",
        borderRadius: 50,
        padding: 9,
        alignSelf: "flex-start",
        bottom: -4,
        right: -4
    },
    inputsContainer: {
        marginTop: 20,
        marginBottom: 32,
        gap: 16
    },
    cards: {
        flex: 1
    },
    list: {
        top: -21
    },
    separator: {
        height: 12
    },
    dump: {
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

export default ProfileScreen