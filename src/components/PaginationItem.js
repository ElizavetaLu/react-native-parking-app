import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";


const PaginationItem = ({ currentIndex, index, isRotate }) => {

    const animStyle = useAnimatedStyle(() => {

        if (currentIndex === index) {
            return {
                backgroundColor: "#333",
                width: 28
            }
        } else {
            return { backgroundColor: "rgba(51, 51, 51, .2)", width: 4 }
        }

    }, [currentIndex, index]);


    return (
        <View style={styles.container} >
            <Animated.View style={[styles.pagination, animStyle,]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 4,
        borderRadius: 50,
        overflow: "hidden"
    },
    pagination: {
        borderRadius: 50,
        backgroundColor: "rgba(51, 51, 51, .2)",
        flex: 1,
    }
})

export default PaginationItem;