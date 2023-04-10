import { Text } from "react-native";

const Header = ({ title }) => {

    return (
        <Text style={{
            textAlign: "center",
            textTransform: "capitalize",
            fontSize: 12,
            fontWeight: '500',
            lineHeight: 16.8,
            marginBottom: 37,
            marginTop: 10,
            color: "#333333"
        }}>
            {title}
        </Text>
    )
}

export default Header