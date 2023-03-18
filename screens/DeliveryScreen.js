import { View, Text, SafeAreaView, TouchableOpacity, Image, Button, Alert} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectResturant } from '../features/resturantSlice'
import { XIcon } from 'react-native-heroicons/outline'
import * as Progress from "react-native-progress"
import MapView, { Marker } from "react-native-maps"
import { LogBox } from 'react-native';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const resturant = useSelector(selectResturant);

    const MyPhoneNumber = () =>
    Alert.alert(
      "Call me",
      "+234 708 013 941 3",
    );

  return (
    <View className='bg-[#00ccbb] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center p-5'>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <XIcon color="white" size={30} />
            </TouchableOpacity>
            <Text className='font-light text-white text-lg'>Order Help</Text>
        </View>

        <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
            <View className='flex-row justify-between'>
                <View>
                    <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
                    <Text className='text-4xl font-bold'>30-40 Minutes</Text>
                </View>
                <Image 
                source={{
                    uri: "https://links.papareact.com/fls",
                }}
                className='h-20 w-20'
                />
            </View>

            <Progress.Bar size={30} color="#00ccbb" indeterminate={true} />

            <Text className="mt-3 text-gray-500">
                Your Order at {resturant.title} is being prepared
            </Text>          
        </View>
      </SafeAreaView>

      <MapView
      initialRegion={{
        latitude: resturant.lat,
        longitude: resturant.long,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      className='flex-1 mt-10 z-10'
      mutedType="mutedStandard"
      >
        <Marker 
        coordinate={{
            latitude: resturant.lat,
            longitude: resturant.long,
        }}
        title={resturant.title}
        description={resturant.short_description}
        identifier="origin"
        pinColor="#00ccbb"
        />
      </MapView>

      <SafeAreaView className='bg-white flex-row items-center space-x-5 h-20'>
        <Image 
        source={{
            uri: "https://img.freepik.com/premium-vector/delivery-man-ride-motorcycle-cartoon-vector_261104-110.jpg",
        }}
        className='h-12 w-12 bg-gray-300 p-4 rounded-full ml-5'
        />
        <View className="flex-1">
            <Text className='text-lg'>Idunorba Victoria</Text>
            <Text className="text-gray-400">Your Rider</Text>
        </View>
        
        <Text className='text-[#00ccbb] text-lg mr-5 font-bold'
                onPress={MyPhoneNumber}
        >Call</Text>

       
      </SafeAreaView>

    </View>
  )
}

export default DeliveryScreen