import { StyleSheet, Pressable, View } from 'react-native';
import { Camera } from 'expo-camera';
import { Image } from 'expo-image';
import { useState } from 'react';


const CameraScreen = ({ navigation }) => {

    const [isTorchOn, setIsTorchOn] = useState(false);

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                flashMode={isTorchOn ? 'torch' : 'off'}
                zoom={0.4}
            >
            </Camera>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.iconContainer} onPress={() => setIsTorchOn(!isTorchOn)}>
                    <Image style={styles.flashlight} source={require('../../assets/images/icons/flashlight.png')} />
                </Pressable>

                <Pressable style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.close} source={require('../../assets/images/icons/close.png')} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        flex: 1,
        backgroundColor: "#333"
    },
    camera: {
        flex: 1
    },
    buttonsContainer: {
        margintop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: 200
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        width: 70,
        borderRadius: 50,
        backgroundColor: "rgba(255, 255, 255, 0.5)"
    },
    flashlight: {
        height: 40,
        width: 40,
    },
    close: {
        height: 50,
        width: 50,
    },
});

export default CameraScreen