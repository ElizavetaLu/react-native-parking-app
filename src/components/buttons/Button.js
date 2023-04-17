import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ text, onPress, primary, secondary }) => {

    const background = primary ? "#333333" : secondary ? "#4FA4FB" : "#333333";

    return (
        <TouchableOpacity activeOpacity={0.9} style={{ ...styles.button, backgroundColor: background }} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        paddingVertical: 13,
        paddingHorizontal: 24,
        borderRadius: 30
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 26.08,
        textTransform: "capitalize"
    }
})

export default Button