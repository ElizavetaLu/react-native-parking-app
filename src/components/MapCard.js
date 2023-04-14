import { View, Image, Text, StyleSheet } from "react-native";

const MapCard = ({ active, address, distance }) => {


    return (
        <View style={styles.card}>
            {active && <Image
                style={styles.icon}
                source={require("../../assets/images/icons/selected.png")}
            />}
            <View style={styles.locationRow}>
                <Image style={styles.locationIcon} source={require('../../assets/images/icons/location.png')} />
                <Text style={{ fontSize: 14, fontWeight: 500, lineHeight: 19.6, color: "#fff" }}>{address}</Text>
            </View>
            <Text style={styles.distance}>{distance}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        position: "absolute", 
        top: -6,
        right: -6
    },

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
        width: 340
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    address: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 19.6,
        marginBottom: 4
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


