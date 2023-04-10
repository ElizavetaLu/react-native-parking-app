import { Text, StyleSheet } from "react-native";
import ModalContainer from "./ModalContainer";


const ErrorModal = ({ modalVisible, setModalVisible }) => {

    return (
        <ModalContainer
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
        >
            <Text style={styles.title}>Oops, Error!</Text>
            <Text style={styles.errorMessage}>Parking meter not found!</Text>
        </ModalContainer>
    )
}


const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 25,
        color: "#333333",
        marginBottom: 8
    },
    errorMessage: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: "#333333"
    }
})

export default ErrorModal 