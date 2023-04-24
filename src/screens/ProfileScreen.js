import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationEvents } from 'react-navigation';
import { useEffect, useState } from "react";

import UnAuthProfileScreen from "./UnAuthProfileScreen";

import RoundedContainer from "../components/RoundedContainer";
import Button from "../components/buttons/Button";
import SmallCard from "../components/SmallCard";
import DummyText from "../components/DummyText";
import Header from "../components/Header";
import Input from "../components/Input";

import { onCardDelete, updateCards } from "../helpers";



const ProfileScreen = ({ navigation }) => {

    const [token, setToken] = useState(null);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');


    const [cards, setCards] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then(res => setToken(res))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        updateCards(setCards);
    }, [])

    const logOut = async () => {
        await AsyncStorage.removeItem("token")
        navigation.navigate('Start')
    }


    return (
        <>
            {token ?
                <RoundedContainer>
                    <View View style={styles.container} >

                        <NavigationEvents onDidFocus={() => updateCards(setCards)} />

                        <Header title="my profile" />

                        <View style={styles.profile}>
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

                            <View style={styles.cards}>

                                <Header title="my cards" />


                                {cards.length < 1 && <DummyText text="You have no added cards" />}

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
                                    <Button text="Log Out" onPress={logOut} primary />
                                </View>
                            </View>

                        </View>
                    </View >
                </RoundedContainer >

                : <UnAuthProfileScreen setToken={setToken} />

            }</>
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
    avatarContainer: {
        position: "relative",
        alignSelf: "center"
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
    buttonContainer: {
        flexDirection: "row",
        gap: 20,
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