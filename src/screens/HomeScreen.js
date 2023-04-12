import { Text, Image, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Pressable, Animated } from "react-native";
import CardForPayModal from "../components/modals/CardForPayModal";
import { requestForegroundPermissionsAsync } from "expo-location";
import PaymentModal from "../components/modals/PaymentModal";
import MapView, { Callout, Marker } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";


const markers = [
    { latitude: 37.78825, longitude: -122.4324, title: "Text" },
    { latitude: 37.78735, longitude: -122.4344, title: "Text" },
    { latitude: 37.78945, longitude: -122.4324, title: "Text" },
    { latitude: 37.78655, longitude: -122.4334, title: "Text" },
]

const HomeScreen = () => {

    const [paymentModal, setPaymentModal] = useState(false);
    const [cardDataModal, setCardDataModal] = useState(false);

    const test = async () => {
        const { granted } = await requestForegroundPermissionsAsync();

        if (!granted) {
            console.log("Location permission not granted");
        }
    }

    useEffect(() => {
        test()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header title="scan your code" />

            <PaymentModal modalVisible={paymentModal} setModalVisible={setPaymentModal} />
            <CardForPayModal modalVisible={cardDataModal} setModalVisible={setCardDataModal} />

            <Pressable onPress={() => { }}>
                <Image style={styles.image} source={require('../../assets/images/scanQR.png')} />
            </Pressable>

            <View style={styles.mapWrapper}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        userInterfaceStyle="dark"

                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.00922,
                            longitudeDelta: 0.00421,
                        }}

                    >
                    </MapView>
                </View>
            </View>

        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        alignSelf: "center",
        marginBottom: 16,
    },
    mapWrapper: {
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#333333"
    },
    map: {
        height: "100%",
    },
    mapContainer: {
        borderRadius: 32,
        overflow: "hidden",
    },

})

export default HomeScreen