import { StyleSheet, Text, View } from "react-native";
import { Image } from 'expo-image';


const PaymentInfo = ({ address, date, time, total }) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require("../../assets/images/icons/Union.png")} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.address}>{address}</Text>
                <View style={styles.data}>
                    <Text style={styles.dataText}>{date}</Text>
                    <Text style={styles.dataText}>{time}</Text>
                </View>
            </View>

            <Text style={styles.payment}>-{total}$</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    imageContainer: {
        backgroundColor: "#333",
        width: 44,
        height: 44,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 19.08,
        height: 22.48,
    },
    infoContainer: {
        flex: 1,
        marginStart: 12,
        gap: 2,
    },
    address: {
        color: "#333",
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 17,
    },
    data: {
        flexDirection: "row",
        gap: 28,
    },
    dataText: {
        color: "#8F8F8F",
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 17,
    },
    payment: {
        color: "#333",
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 20,
    },
})

export default PaymentInfo