import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Animated, Modal, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/globalStyles';


const DetailScreen = ({ route, navigation }) => {
    const { location } = route.params;
    const { width, height } = Dimensions.get('window');
    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [modalVisible, setModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const flatListRef = useRef(null);

    const toggleDescription = () => {
        setExpanded(!expanded);
        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const descriptionHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 300],
    });

    const openImageModal = (index) => {
        setCurrentImageIndex(index);
        setModalVisible(true);
    };

    const closeImageModal = () => {
        setModalVisible(false);
    };

    const renderImageItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => openImageModal(index)}>
                <Image
                    source={{ uri: item }} // Correctly loading the image using uri
                    style={[styles.image, { width: width - 32 }]}
                    resizeMode="cover"
                />
                <View style={styles.imageOverlay}>
                    <Text style={styles.imageText}>Tap to enlarge</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderModalImageItem = ({ item }) => (
        <Image
            source={{ uri: item }} // Correctly loading the image using uri
            style={[styles.fullImage, { width, height: height * 0.8 }]}
            resizeMode="contain"
        />
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{location.title}</Text>
                <Text style={styles.date}>Reported on: {location.date}</Text>
                <Text style={styles.tag}>Location: {location.locationTag}</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coordinate.latitude,
                        longitude: location.coordinate.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={location.coordinate}
                        title={location.title}
                        description={location.description}
                    />
                </MapView>

                <View style={styles.testImageContainer}>
                    <Image
                        source={{ uri: location.uri }} // Correctly loading the image using uri
                        style={styles.testImage}
                        resizeMode="cover"
                    />
                </View>

                <Text style={styles.subtitle}>Description</Text>
                <View style={styles.descriptionContainer}>
                    <Animated.View style={[styles.descriptionContent, { height: descriptionHeight }]}>
                        <Text style={styles.description}>{location.description}</Text>
                    </Animated.View>
                    <TouchableOpacity onPress={toggleDescription} style={styles.expandButton}>
                        <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.coordinates}>
                    Coordinates: {location.coordinate.latitude.toFixed(6)}, {location.coordinate.longitude.toFixed(6)}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        alignItems: 'center',
        padding: 16,
    },
    map: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginVertical: 16,
        overflow: 'hidden',
    },
    imageCarousel: {
        marginVertical: 16,
    },
    image: {
        height: 200,
        borderRadius: 10,
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    imageText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
        color: colors.text,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
        color: colors.text,
        alignSelf: 'flex-start',
    },
    descriptionContainer: {
        width: '100%',
        overflow: 'hidden',
        marginBottom: 16,
    },
    descriptionContent: {
        overflow: 'hidden',
    },
    description: {
        fontSize: 16,
        textAlign: 'justify',
        color: colors.text,
    },
    expandButton: {
        alignSelf: 'center',
        paddingTop: 8,
    },
    date: {
        fontSize: 14,
        color: colors.secondary,
        marginBottom: 8,
    },
    tag: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    coordinates: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 16,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        flex: 1,
    },
    modalControls: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    closeButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageCounter: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noImagesText: {
        fontSize: 16,
        color: colors.secondary,
        marginVertical: 16,
    },
    testImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    testImage: {
        width: 350,
        height: 200,
    },
});

export default DetailScreen;
