import { useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import SignUpPhoneModal from "../components/modals/SignUpPhoneModal";
import SignUpCodeModal from "../components/modals/SignUpCodeModal";
import RoundedContainer from "../components/RoundedContainer";
import Button from "../components/buttons/Button";
import SmallCard from "../components/SmallCard";
import Header from "../components/Header";
import Input from "../components/Input";


const isUserLogged = true;
const cardsList = [
    { blocked: false, cardNumber: '1234567891011121', expDate: '12/24', id: 0 },
    { blocked: true, cardNumber: '1234567891016544', expDate: '12/25', id: 1 },
    { blocked: false, cardNumber: '1234567891018765', expDate: '11/26', id: 2 },
    { blocked: true, cardNumber: '1234567891013456', expDate: '10/24', id: 3 },
]

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [phoneModal, setPhoneModal] = useState(false);
    const [codeModal, setCodeModal] = useState(false);

    return (
        <RoundedContainer>
            <View style={{ flex: 1, marginBottom: 25, paddingHorizontal: 16 }}>

                <Header title="my profile" />

                <SignUpPhoneModal modalVisible={phoneModal} setModalVisible={setPhoneModal} openNextModal={setCodeModal} />
                <SignUpCodeModal modalVisible={codeModal} setModalVisible={setCodeModal} />


                <View style={{ flex: 1 }}>
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
                                <Input value={phone} onChange={setPhone} label="Phone Number" />
                                <Input value={email} onChange={setEmail} label="Email" />
                            </View>
                        </>
                        : < View style={{ flex: 1, justifyContent: "center" }}>
                            <Button text="sign up" onPress={() => setPhoneModal(true)} primary />
                        </View >
                    }

                    <View style={{ flex: 1 }}>

                        <Header title="my cards" />

                        <FlatList
                            style={{ top: -21 }}
                            data={cardsList}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                            renderItem={({ item }) => {
                                return (
                                    <SmallCard
                                        blocked={item.blocked}
                                        cardNumber={item.cardNumber}
                                        expDate={item.expDate}
                                    />
                                )
                            }}
                        />
                        <Button text="Delete Profile" onPress={() => { }} primary />
                    </View>

                </View>
            </View>
        </RoundedContainer>
    )
}

const styles = StyleSheet.create({
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
    }
})

export default ProfileScreen