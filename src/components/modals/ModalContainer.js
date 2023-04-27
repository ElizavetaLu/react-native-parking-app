import UnderLineButton from "../buttons/UnderLineButton";
import { Modal, View, StyleSheet } from "react-native";
import Button from "../buttons/Button";

const ModalContainer = ({
    children,
    modalVisible,
    setModalVisible,
    action,
    buttonText,
    primary,
    secondary
}) => {

    return (
        <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    {children}

                    <View style={styles.btnContainer}>
                        {buttonText && <Button text={buttonText} onPress={action} primary={primary} secondary={secondary} />}
                        <UnderLineButton text="close" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(37, 37, 37, 0.5)",
    },
    modalView: {
        width: "100%",
        backgroundColor: '#fff',
        borderRadius: 40,
        paddingHorizontal: 32,
        paddingVertical: 40
    },
    btnContainer: {
        alignSelf: 'center',
        alignItems: "center",
        position: "absolute",
        bottom: -46,
    }
})

export default ModalContainer