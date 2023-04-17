import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import SignUpPhoneModal from "../components/modals/SignUpPhoneModal";
import SignUpCodeModal from "../components/modals/SignUpCodeModal";
import RoundedContainer from "../components/RoundedContainer";
import { onCardDelete, updateCards } from "../helpers";
import { NavigationEvents } from 'react-navigation';
import Button from "../components/buttons/Button";
import SmallCard from "../components/SmallCard";
import Header from "../components/Header";
import Input from "../components/Input";
import { useState } from "react";


const isUserLogged = true;

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [phoneModal, setPhoneModal] = useState(false);
    const [codeModal, setCodeModal] = useState(false);

    const [cards, setCards] = useState([]);


    return (
        <RoundedContainer>
            <View style={styles.container}>

                <NavigationEvents onDidFocus={() => updateCards(setCards)} />

                <Header title="my profile" />

                <SignUpPhoneModal modalVisible={phoneModal} setModalVisible={setPhoneModal} openNextModal={setCodeModal} />
                <SignUpCodeModal modalVisible={codeModal} setModalVisible={setCodeModal} />

                <View style={styles.profile}>
                    {isUserLogged
                        ? <>
                            <View style={styles.avatarContainer}>
                                <Image source={require("../../assets/images/icons/avatar.png")} />
                                <Pressable style={styles.pencil} onPress={() => { }}>
                                    <Image source={require("../../assets/images/icons/pencil.png")} />
                                </Pressable>
                            </View>
                            <View style={styles.inputsContainer}>
                                <Input value={name} onChange={setName} label="Name" />
                                <Input value={phone} onChange={setPhone} label="Phone Number" maxLength={15} />
                                <Input value={email} onChange={setEmail} label="Email" />
                            </View>
                        </>
                        :
                        < View style={styles.signUpContainer}>
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
                                        action={() => onCardDelete(item.id, setCards)}
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
    signUpContainer: {
        height: 250,
        justifyContent: "center",
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