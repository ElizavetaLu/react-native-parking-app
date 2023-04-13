import { Image, StyleSheet, View, SafeAreaView, Pressable, Animated } from "react-native";
import CardForPayModal from "../components/modals/CardForPayModal";
import { requestForegroundPermissionsAsync } from "expo-location";
import PaymentModal from "../components/modals/PaymentModal";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import MapCard from "../components/MapCard";
import mapDarkStyle from "../mapDarkStyle";

const markers = [
    { latitude: 37.78825, longitude: -122.4324, address: "Lvivska Str. Parking Forum Lviv", distance: "400m from you" },
    { latitude: 37.78735, longitude: -122.4344, address: "Lvivska Str. Parking Forum Lviv", distance: "500m from you" },
    { latitude: 37.78945, longitude: -122.4324, address: "Lvivska Str. Parking Forum Lviv", distance: "600m from you" },
    { latitude: 37.78655, longitude: -122.4334, address: "Lvivska Str. Parking Forum Lviv", distance: "700m from you" },
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
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapDarkStyle}

                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.06922,
                            longitudeDelta: 0.06421,
                        }}

                    >
                        {markers.map((marker, index) => {
                            return (
                                <Marker
                                    key={index}
                                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                >
                                    <Animated.Image source={require('../../assets/images/icons/mapMarker.png')} />
                                </Marker>
                            );
                        })}
                    </MapView>
                    <Animated.ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollView}
                    >
                        {markers.map((marker, index) => {
                            return (
                                < MapCard
                                    key={index}
                                    address={marker.address}
                                    distance={marker.distance}
                                />
                            )
                        })}
                    </Animated.ScrollView>
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
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
    }
})

export default HomeScreen