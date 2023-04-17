import { Dimensions, Image, StyleSheet, View, SafeAreaView, Pressable, Animated } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import CardForPayModal from "../components/modals/CardForPayModal";
import { requestForegroundPermissionsAsync } from "expo-location";
import PaymentModal from "../components/modals/PaymentModal";
import ErrorModal from "../components/modals/ErrorModal";
import Carousel from 'react-native-reanimated-carousel';
import { useEffect, useState } from "react";
import MapCard from "../components/MapCard";
import mapDarkStyle from "../mapDarkStyle";
import Header from "../components/Header";



const coordinates = [
    { latitude: 49.842957, longitude: 24.031111, address: "Lvivska Str. Parking Forum Lviv 1", distance: "400m from you" },
    { latitude: 49.844858, longitude: 24.032312, address: "Lvivska Str. Parking Forum Lviv 2", distance: "500m from you" },
    { latitude: 49.845759, longitude: 24.031413, address: "Lvivska Str. Parking Forum Lviv 3", distance: "600m from you" },
    { latitude: 49.844650, longitude: 24.030014, address: "Lvivska Str. Parking Forum Lviv 4", distance: "700m from you" },
]


const HomeScreen = () => {

    const [paymentModal, setPaymentModal] = useState(false);
    const [cardDataModal, setCardDataModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const width = Dimensions.get('window').width;

    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const onCarouselItemChange = (index) => {

        setActiveIndex(index);
        let location = coordinates[index];

        map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0049,
            longitudeDelta: 0.0019,
        });

        markers[index].showCallout();
    }


    const askLocationPermission = async () => {
        const { granted } = await requestForegroundPermissionsAsync();

        if (!granted) {
            console.log("Location permission not granted");
        }
    }

    useEffect(() => {
        askLocationPermission();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header title="scan your code" />

            <PaymentModal
                address="Lvivska Str. Parking Forum Lviv"
                date="Jun 12, 2022"
                time="12:40-13:40"
                total="12"
                modalVisible={paymentModal}
                setModalVisible={setPaymentModal}
                showNextModal={setCardDataModal}
            />
            <CardForPayModal
                address="Lvivska Str. Parking Forum Lviv"
                date="Jun 12, 2022"
                time="12:40-13:40"
                total="12"
                modalVisible={cardDataModal}
                setModalVisible={setCardDataModal}
                setErrorModal={setErrorModal}
            />
            <ErrorModal modalVisible={errorModal} setModalVisible={setErrorModal} />

            <Pressable onPress={() => { }}>
                <Image style={styles.image} source={require('../../assets/images/scanQR.png')} />
            </Pressable>

            <View style={styles.mapWrapper}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapDarkStyle}
                        ref={map => setMap(map)}
                        initialRegion={{
                            latitude: 49.842957,
                            longitude: 24.031111,
                            latitudeDelta: 0.0049,
                            longitudeDelta: 0.0019,
                        }}
                    >
                        {coordinates.map((marker, index) => {
                            return (
                                <Marker
                                    key={index}
                                    ref={ref => markers[index] = ref}
                                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                >
                                    <Animated.Image
                                        style={activeIndex === index && { width: 28.8, height: 34.45 }}
                                        source={require('../../assets/images/icons/mapMarker.png')}
                                    />
                                </Marker>
                            );
                        })}
                    </MapView>
                    <View style={styles.carouselContainer}>
                        <Carousel
                            loop
                            mode="parallax"
                            modeConfig={{
                                parallaxScrollingScale: 0.9,
                                parallaxScrollingOffset: 100,
                            }}

                            height={88}
                            width={width}

                            data={coordinates}
                            renderItem={({ item, index }) => (
                                < MapCard
                                    key={item.id}
                                    active={index === activeIndex}
                                    address={item.address}
                                    distance={item.distance}
                                />
                            )}
                            onSnapToItem={onCarouselItemChange}
                        />
                    </View>
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
    carouselContainer: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
    }
})

export default HomeScreen