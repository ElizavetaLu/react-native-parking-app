import { FloatingLabelInput } from 'react-native-floating-label-input';
import { StyleSheet } from "react-native";


const Input = ({ value, onChange, label, isPassword, maxLength }) => {

    return (
        <FloatingLabelInput
            autoCapitalize="none"
            autoCorrect={false}
            isPassword={isPassword}
            maxLength={maxLength}
            label={label}
            containerStyles={styles.inputContainer}
            inputStyles={styles.input}
            customLabelStyles={{ colorFocused: '#333333', colorBlurred: "#8F8F8F" }}
            value={value}
            onChangeText={onChange}
        />
    )
}

const styles = StyleSheet.create({
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
    }
})

export default Input