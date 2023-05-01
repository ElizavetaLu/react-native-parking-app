import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInput, StyleSheet, Platform } from "react-native";

const Input = ({ value, onChange, label, maxLength }) => {

    const width = maxLength === 3 ? 88 : "100%";


    if (Platform.OS === "web") {
        return <TextInput
            maxLength={maxLength}
            placeholder={label}
            placeholderTextColor="#8F8F8F"

            style={[{width}, styles.webInput]}
            value={value}
            onChangeText={onChange}
        />
    }

    return (
        <FloatingLabelInput
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={maxLength}

            label={label}
            inputStyles={[width, styles.input]}
            containerStyles={styles.inputContainer}
            customLabelStyles={{ colorFocused: '#333333', colorBlurred: "#8F8F8F" }}

            value={value}
            onChangeText={onChange}
        />
    )
}

const styles = StyleSheet.create({
    webInput: {
        outlineStyle: "none",
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 30,
        paddingVertical: 10,
        paddingLeft: 24,
        height: 44,
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 17,
        color: "#333333"
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 30,
        paddingVertical: 10,
        paddingLeft: 24,
        height: 44
    },
    input: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 17,
        color: "#333333"
    },
    eyeIcon: {
        marginRight: 10
    }
})

export default Input