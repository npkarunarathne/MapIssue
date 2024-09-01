import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import { locations } from '../constants/locations';

const MapScreen = ({ navigation }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.1;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const handleMarkerPress = (location) => {
        setSelectedLocation(location);
    };

    const handleCloseModal = () => {
        setSelectedLocation(null);
    };

    const handleNavigateToDetail = () => {
        if (selectedLocation) {
            handleCloseModal();  // Close the modal first
            navigation.navigate('DetailScreen', { location: selectedLocation });
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 6.927079,
                    longitude: 79.861244,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            >
                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        coordinate={location.coordinate}
                        onPress={() => handleMarkerPress(location)}
                    />
                ))}
            </MapView>
            <Modal
                isVisible={!!selectedLocation}
                onBackdropPress={handleCloseModal}
                onBackButtonPress={handleCloseModal}
            >
                <View style={styles.modalContent}>
                    {selectedLocation && (
                        <>
                            <Text style={styles.date}>{selectedLocation.date}</Text>
                            <Image source={{ uri: selectedLocation.uri }} style={styles.image} />
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={handleNavigateToDetail}
                            >
                                <Text style={styles.closeButtonText}>View Details</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'skyblue',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MapScreen;
