import { Text, View, StyleSheet } from "react-native";

const Separator = () => {
    return (
        <View style={styles.container}>
            <View style={styles.line}></View>
            <Text style={styles.text}>or</Text>
            <View style={styles.line}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        marginVertical: 30
    },
    line: {
        width: 100,
        height: 1,
        backgroundColor: "gray"
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 500,
        marginVertical: 10
    }
})

export default Separator