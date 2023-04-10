import CardForPayModal from "../components/modals/CardForPayModal";
import { requestForegroundPermissionsAsync } from "expo-location";
import PaymentModal from "../components/modals/PaymentModal";
import { Image, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import Header from "../components/Header";

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
        <>
            <Header title="scan your code" />

            <PaymentModal modalVisible={paymentModal} setModalVisible={setPaymentModal} />
            <CardForPayModal modalVisible={cardDataModal} setModalVisible={setCardDataModal} />
            <Image style={styles.image} source={require('../../assets/images/scanQR.png')} />
            <View style={styles.mapWrapper}>
                <View style={styles.mapContainer}>
                    <MapView
                        userInterfaceStyle={'dark'}
                        style={styles.map}

                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.00922,
                            longitudeDelta: 0.00421,
                        }}

                    >
                        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} >
                            <Image source={require('../../assets/images/icons/mapMarker.png')} />
                        </Marker>
                        <Marker coordinate={{ latitude: 37.78725, longitude: -122.4344 }} >
                            <Image source={require('../../assets/images/icons/mapMarker.png')} />
                        </Marker>
                        <Marker coordinate={{ latitude: 37.78925, longitude: -122.4324 }} >
                            <Image source={require('../../assets/images/icons/mapMarker.png')} />
                        </Marker>
                        <Marker coordinate={{ latitude: 37.78625, longitude: -122.4334 }} >
                            <Image source={require('../../assets/images/icons/mapMarker.png')} />
                        </Marker>
                    </MapView>
                </View>
            </View>

        </>
    )
}


const styles = StyleSheet.create({
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
    }
})



export default HomeScreen