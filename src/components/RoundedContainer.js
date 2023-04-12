import { SafeAreaView, View, StyleSheet } from "react-native";

const RoundedContainer = ({ children }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.darkBackground}>
                <View style={styles.container}>
                    {children}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
    darkBackground: {
        flex: 1,
        backgroundColor: "#333333"
    },
    container: {
        borderBottomEndRadius: 32,
        borderBottomStartRadius: 32,
        flex: 1,
        backgroundColor: "#fff"
    },
})

export default RoundedContainer