import { View, FlatList, Text, StyleSheet } from "react-native";
import RoundedContainer from "../components/RoundedContainer";
import NewCardModal from "../components/modals/NewCardModal";
import PaymentInfo from "../components/PaymentInfo";
import Button from "../components/buttons/Button";
import Header from "../components/Header";
import Card from "../components/Card";
import { useState } from "react";

const cardsList = [
    { blocked: false, cardNumber: '1234567891011121', expDate: '12/24', id: 0 },
    { blocked: true, cardNumber: '1234567891016544', expDate: '12/25', id: 1 },
    { blocked: false, cardNumber: '1234567891018765', expDate: '11/26', id: 2 },
    { blocked: true, cardNumber: '1234567891013456', expDate: '10/24', id: 3 },
]

const PaymentsScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <RoundedContainer>
            <NewCardModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

            <Header title="my cards" />

            <View style={styles.container}>
                <FlatList
                    style={{ flex: 1, paddingBottom: 18 }}
                    horizontal
                    data={cardsList}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{ width: 18 }} />}
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
                    style={{ flex: 1, paddingHorizontal: 16, marginBottom: 26 }}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    keyExtractor={item => item}
                    ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
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
        justifyContent: "space-between",
        paddingBottom: 28
    },
    title: {
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 25,
        paddingLeft: 16,
        paddingBottom: 12,
        marginTop: 32,
    }
})

export default PaymentsScreen