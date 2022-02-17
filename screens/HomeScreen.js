import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
//we use the babel to set it up
import { setDestination, setOrigin } from "../slices/navSlice";
import { useDispatch } from 'react-redux';
import NavFavourites from '../components/NavFavourites';


const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                        marginLeft: 8,
                    }}
                    source={
                        require('../assets/hello.jpg')
                    }
                />

                <GooglePlacesAutocomplete
                    placeholder="Where From?"
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        }
                    }}
                    onPress={(data, details = null) => {
                        //console.log(data);
                        //console.log(details);
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        })
                        );

                        //dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    //geometry location, coordinates, store them and rendering it on a map
                    //where we store it? we dispatch an action which gors into the data layer aka redux
                    //then we use selector which we set up earlier as well to pull the information from the data layer aka redux and use it in the component
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en'
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />

                <NavOptions />

                <NavFavourites></NavFavourites>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        color: "blue",
    },
});
