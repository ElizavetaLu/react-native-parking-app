import { View, Animated, StyleSheet, Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import MapView, { Marker } from "react-native-maps";

import MapCard from "./MapCard";

import coordinates from "../coordinatesDummy";
import mapDarkStyle from "../mapDarkStyle";


const width = Dimensions.get('window').width;

const Map = ({ markers, activeIndex, onCarouselItemChange, setMap }) => {

    return (
        <View style={styles.mapWrapper}>
            <View style={styles.mapContainer}>
                <MapView
                    zoomControlEnabled={false}

                    style={styles.map}
                    provider={'google'}
                    customMapStyle={mapDarkStyle}
                    ref={map => {
                        if (Platform.OS === 'web') return () => setMap(map)
                        setMap(map)
                    }}
                    initialRegion={{
                        latitude: 49.842957,
                        longitude: 24.031111,
                        latitudeDelta: 0.0149,
                        longitudeDelta: 0.0119,
                    }}
                >
                    {coordinates.map((marker, index) => {
                        return (
                            <Marker
                                key={index}
                                ref={ref => markers[index] = ref}
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            >
                                <Animated.Image
                                    style={activeIndex === index && marker}
                                    source={require('../../assets/images/icons/mapMarker.svg')}
                                />
                            </Marker>
                        );
                    })}
                </MapView>


                <View style={styles.carouselContainer}>
                    <Carousel
                        loop
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxScrollingOffset: 100,
                        }}

                        height={88}
                        width={width}

                        data={coordinates}
                        renderItem={({ item, index }) => (
                            < MapCard
                                key={item.id}
                                active={index === activeIndex}
                                address={item.address}
                                distance={item.distance}
                            />
                        )}
                        onSnapToItem={onCarouselItemChange}
                    />
                </View>


            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    mapWrapper: {
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#333333"
    },
    map: {
        height: "100%",
        width: "100%"
    },
    mapContainer: {
        flex: 1,
        borderRadius: 32,
        overflow: "hidden",
    },
    carouselContainer: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
    },
    marker:{ 
        width: 28.8, 
        height: 34.45 
    }
})

export default Map