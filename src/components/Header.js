import { StyleSheet, Text } from "react-native";

const Header = ({ title }) => <Text style={styles.header}>  {title}  </Text>;

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        textTransform: "capitalize",
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16.8,
        marginBottom: 37,
        marginTop: 10,
        color: "#333333"
    }
});

export default Header