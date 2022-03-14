import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import tw from "tailwind-react-native-classnames";
import { selectDestination, selectOrigin, setTravalTimeInformation } from '../slices/navSlice';
import { GOOGLE_MAPS_APIKEY } from "@env";
import * as Location from 'expo-location';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const [currentLocation, setCurrentLocation] = React.useState({ latitude: origin.location.lat, longitude: origin.location.lng });
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const intervalId = setInterval(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Location Permission not granted');
                return;
            }
            let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
            const { latitude , longitude } = location.coords;
            setCurrentLocation({ latitude, longitude });
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!origin || !destination) return;

        // Zoom & fit to markers
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination])

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {

            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?
                units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                dispatch(setTravalTimeInformation(data.rows[0].elements[0]));
            })
        };

        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY])
    // completely responsible for calculating the travel time

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}

            <Marker coordinate={currentLocation} title="Current Location" identifier="current" />

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier='origin'
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier='destination'
                />
            )}
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({});
