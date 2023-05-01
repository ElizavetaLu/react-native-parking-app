import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from 'expo-image';


const width = Dimensions.get('window').width;

const MapCard = ({ active, address, distance }) => {

    return (
        <View style={styles.card}>
            {active &&
                <View style={styles.icon}>
                    <Image
                        style={styles.iconSize}
                        source={require("../../assets/images/icons/selected.svg")}
                    />
                </View>
            }

            <View style={styles.locationRow}>
                <Image style={styles.locationIcon} source={require('../../assets/images/icons/location.svg')} />
                <Text style={styles.address}>{address}</Text>
            </View>
            
            <Text style={styles.distance}>{distance}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: "#A7A7A7",
        backgroundColor: "#353535",
        opacity: 0.9,
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginHorizontal: 10,
        borderRadius: 28,
        height: 82,
        width: width / 1.3,
        position: "relative"
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    icon: {
        position: "absolute",
        top: -6,
        right: -6,
        width: 24,
        height: 24
    },
    iconSize: {
        width: 24,
        height: 24
    },
    locationIcon: {
        width: 18,
        height: 22
    },
    address: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 19.6,
        color: "#fff"
    },
    distance: {
        marginLeft: 35,
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 16.8,
        color: "#A7A7A7"
    }
})

export default MapCard


