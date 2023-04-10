import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"

const SmallCard = ({ blocked, cardNumber, expDate }) => {

    const hiddenCardNumber = "**** **** **** " + cardNumber.slice(-4)

    return (
        <View style={styles.container}>
            {blocked
                ? <Image source={require("../../assets/images/icons/lock.png")} />
                : <Image source={require("../../assets/images/icons/unlock.png")} />
            }

            <View style={styles.cardData}>
                <Text style={styles.cardNumber}>{hiddenCardNumber}</Text>
                <View>
                    <Text style={styles.expTitle}>Exp. Date</Text>
                    <Text style={styles.cardExp}>{expDate}</Text>
                </View>
            </View>

            <View style={styles.deleteContainer}>
                <Image source={require("../../assets/images/icons/mini-card.png")} />

                <TouchableOpacity activeOpacity={0.8} style={styles.button}>
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