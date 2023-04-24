import { Text, StyleSheet } from "react-native";

const DummyText = ({ text }) => <Text style={styles.dummy}>{text}</Text>

const styles = StyleSheet.create({
    dummy: {
        textAlign: "center",
        color: "#8F8F8F",
        fontSize: 12,
        fontWeight: 400
    },
})

export default DummyText