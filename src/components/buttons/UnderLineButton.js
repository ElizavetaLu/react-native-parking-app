import { StyleSheet, Text, TouchableOpacity } from "react-native"

const UnderLineButton = ({ text, onPress }) => {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        top: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#fff"
    },
    buttonText: {
        color: "#fff",
        textTransform: "capitalize",
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 22,
    },
})

export default UnderLineButton