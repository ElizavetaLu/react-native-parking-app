import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Image } from 'expo-image';



const Card = ({ blocked, cardNumber, expDate }) => {

    const hiddenCardNumber = "**** **** **** " + cardNumber?.slice(-4);

    return ( 
            <ImageBackground style={styles.container} source={require('../../assets/images/backgrounds/cardDark.png')}>

                <View style={styles.header}>
                    <View></View>
                    <Image style={styles.chipIcon} source={require("../../assets/images/icons/chip.png")} />
                    {blocked
                        ? <Image style={styles.lockIcon} source={require("../../assets/images/icons/lockLight.png")} />
                        : <Image style={styles.lockIcon} source={require("../../assets/images/icons/unlock.png")} />
                    }
                </View>
                <Text style={styles.cardNumber}>{hiddenCardNumber}</Text>
                <View style={styles.footer}>
                    <Image style={styles.cardTypeIcon} source={require("../../assets/images/icons/masterCard.png")} />
                    <View>
                        <Text style={styles.cardExp}>Exp. Date</Text>
                        <Text style={styles.cardExpData}>{expDate}</Text>
                    </View>
                </View>
            </ImageBackground> 
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 26.72,
        paddingBottom: 21.38,
        paddingHorizontal: 16,
        width: 230,
        height: 283,
        borderRadius: 30.65,
        justifyContent: "space-between"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    chipIcon: {
        width: 35.76,
        height: 23.38
    },
    lockIcon: {
        width: 14,
        height: 20
    },
    cardTypeIcon: {
        width: 38,
        height: 22
    },
    cardNumber: {
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 29,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cardExp: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 17,
        color: "#fff",
        opacity: 0.5,
        textAlign: "right"
    },
    cardExpData: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        color: "#fff",
        opacity: 0.8,
        textAlign: "right"
    }
})

export default Card