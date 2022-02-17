import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import tw from "tailwind-react-native-classnames";
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
  {
    id: "Uber-X-123",
    //title: "UberX",
    title: "Travel time: ",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
  // {
  //   id: "Uber-XL-456",
  //   title: "Uber XL",
  //   multiplier: 1.2,
  //   image: "https://links.papareact.com/5w8"
  // },
  // {
  //   id: "Uber-LUX-789",
  //   title: "Uber LUX",
  //   multiplier: 1.75,
  //   image: "https://links.papareact.com/7pf"
  // },
];

//If we have SURGE pricing, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travalTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travalTimeInformation?.distance?.text}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
      </View>

      <FlatList data={data} keyExtractor={item => item.id}//pass the data
        //render the data. render item, for each one  
        //destruct item, each thing in the list
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && 'bg-gray-200'
              }`}
          >
            <Image style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travalTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            {/* <Text style={tw`text-xl`}>

              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'AUD'
              }).format(

                (travalTimeInformation?.duration.value * SURGE_CHARGE_RATE
                  * multiplier) / 100
              )
              
              }

            </Text> */}
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
          {/* <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text> */}
          <Text style={tw`text-center text-white text-xl`}>Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionCard;

const styles = StyleSheet.create({});