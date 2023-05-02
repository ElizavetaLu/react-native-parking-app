import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from 'expo-image';


const SmallCard = ({ blocked, cardNumber, expDate, action }) => {

    const hiddenCardNumber = "**** **** **** " + cardNumber.slice(-4);

    return (
        <View style={styles.container}>
            {blocked
                ? <Image style={styles.lockIcon} source={require("../../assets/images/icons/lockDark.svg")} />
                : <Image style={styles.lockIcon} source={require("../../assets/images/icons/unlockDark.svg")} />
            }

            <View style={styles.cardData}>
                <Text style={styles.cardNumber}>{hiddenCardNumber}</Text>
                <View>
                    <Text style={styles.expTitle}>Exp. Date</Text>
                    <Text style={styles.cardExp}>{expDate}</Text>
                </View>
            </View>

            <View style={styles.deleteContainer}>
                <Image style={styles.cardIcon} source={require("../../assets/images/icons/mini-card.png")} />

                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={action}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 81,
        flexDirection: "row",
        gap: 12,
        paddingTop: 12,
        paddingRight: 18,
        paddingBottom: 11,
        paddingLeft: 16,
        backgroundColor: "#F8F8F8",
        borderRadius: 22,
    },
    lockIcon: {
        width: 14,
        height: 20
    },
    cardIcon: {
        width: 37,
        height: 25
    },
    cardData: {
        flex: 1,
        justifyContent: "space-between"
    },
    cardNumber: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        color: "#333333"
    },
    expTitle: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 16,
        color: "#333333",
        opacity: 0.5,
    },
    cardExp: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        color: "#333333",
        opacity: 0.8,
    },
    deleteContainer: {
        justifyContent: "space-between"
    },
    button: {
        borderBottomWidth: 1,
        borderBottomColor: "#333333"
    },
    buttonText: {
        paddingBottom: 2,
        fontSize: 12,
        fontWeight: 500,
    },
})

export default SmallCard