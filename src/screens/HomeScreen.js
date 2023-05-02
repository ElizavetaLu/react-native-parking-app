import { Text, StyleSheet, View, SafeAreaView, Pressable } from "react-native";
import { requestForegroundPermissionsAsync } from "expo-location";
import { Camera } from 'expo-camera';
import { Image } from 'expo-image';

import { useEffect, useRef, useState } from "react";

import CardForPayModal from "../components/modals/CardForPayModal";
import PaymentModal from "../components/modals/PaymentModal";
import ErrorModal from "../components/modals/ErrorModal";
import Header from "../components/Header";
import Map from "../components/Map";

import coordinates from "../coordinatesDummy";



const HomeScreen = () => {

    const [paymentModal, setPaymentModal] = useState(false);
    const [cardDataModal, setCardDataModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);


    //map
    const [markers, setMarkers] = useState([]);
    const mapRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const onCarouselItemChange = (index) => {

        setActiveIndex(index);
        let location = coordinates[index];

        if (mapRef && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0049,
                longitudeDelta: 0.0019,
            });
        }

        markers[index].showCallout();
    }


    const askLocationPermission = async () => {
        const { granted } = await requestForegroundPermissionsAsync();

        if (!granted) console.log("Location permission not granted");
    }

    useEffect(() => {
        askLocationPermission();
    }, [])


    //camera
    const [cameraView, setCameraView] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(null);

    const cameraPermisionFunction = async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(cameraPermission.granted);
    };

    useEffect(() => {
        cameraPermisionFunction();
    }, []);

    const onScanerPress = async () => {

        if (!cameraPermission) {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            return setCameraPermission(cameraPermission.granted);
        }
        setCameraView(!cameraView);
    }



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

            <View style={styles.scaner}>
                {cameraView
                    ? <View style={styles.cameraContainer}>
                        <Camera
                            style={styles.containerSize}
                            zoom={0.4}
                        >
                            <Text></Text>
                        </Camera>
                    </View>
                    : <Pressable style={styles.scaner} onPress={onScanerPress}>
                        <Image
                            style={styles.containerSize}
                            source={require('../../assets/images/scanQR.png')}
                        />
                        <View style={styles.dummy}>
                            <Text style={styles.dummyText}>tap to scan code</Text>
                        </View>
                    </Pressable>
                }
            </View>


            <Map
                markers={markers}
                activeIndex={activeIndex}
                onCarouselItemChange={onCarouselItemChange}
                mapRef={mapRef}
            />

        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scaner: {
        alignSelf: "center",
        marginBottom: 16,
        width: 343,
        height: 153,
        borderRadius: 22
    },
    dummy: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 343,
        height: 153,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52,52,52, .6)",
        borderRadius: 33
    },
    dummyText: {
        color: "white",
        textTransform: "capitalize",
        fontSize: 18,
        fontWeight: "500"
    },
    cameraContainer: {
        width: 343,
        height: 153,
        borderRadius: 22,
        overflow: "hidden"
    },
    containerSize: {
        width: 343,
        height: 153
    }
})

export default HomeScreen