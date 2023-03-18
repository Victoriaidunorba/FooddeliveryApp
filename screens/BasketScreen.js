import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch} from 'react-redux'
import { selectResturant } from '../features/resturantSlice'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'
import Currency from 'react-currency-formatter'
import { removeFromBasket } from '../features/basketSlice'
import PreparingOrderScreen from './PreparingOrderScreen'

const BasketScreen = () => {
    const navigation = useNavigation();
    const resturant = useSelector(selectResturant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInBasket(groupedItems);
    }, [items]);

   
    
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
            <View>
                <Text className='text-lg font-bold text-center'>Basket</Text>
                <Text className='text-center text-gray-400'>{resturant.title}</Text>
            </View>
            <TouchableOpacity
            onPress={navigation.goBack}
            className='rounded-full bg-gray-100 absolute top-3 right-5'
            >
            <XCircleIcon color="#00ccbb" height={50} width={50} />
            </TouchableOpacity>
        </View>

        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
            <Image source={{
                uri: "https://img.freepik.com/premium-vector/delivery-man-ride-motorcycle-cartoon-vector_261104-110.jpg",  
            }}
            className='h-7 w-7 bg-gray-300 p-4 rounded-full'
            />
            <Text className='flex-1'>Deliver in 30-40 min</Text>
            <TouchableOpacity>
                <Text className='text-[#00ccbb]'>Change</Text>
            </TouchableOpacity>
        </View>
        <ScrollView className='divide-y divide-gray-200'>
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                <View key={key} className='flex-row items-center space-x-3 py-2 px-5'>
                    <Text className='text-[#00ccbb]'>{items.length} x</Text>
                    <Image 
                    source={{ uri: urlFor(items[0]?.image).url() }}
                    className='h-12 w-12 rounded-full'
                    />
                    <Text className='flex-1'>{items[0]?.name}</Text>

                    <Text className='text-gray-600'>
                        <Currency quantity={items[0]?.price} currency="NGN" />
                    </Text>

                    <TouchableOpacity>
                        <Text className='text-[#00ccbb] text-xs'
                        onPress={() => dispatch(removeFromBasket({ id: key }))}
                        >
                        Remove
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>

        <View className='bg-white mt-5 space-y-4'>
            <View className='flex-row justify-between'>
                <Text className='text-gray-400'>Subtotal</Text>
                <Text className='text-gray-400'>
                    <Currency quantity={basketTotal} currency="NGN" />
                </Text>
            </View>
                
            <View className='flex-row justify-between'>
                <Text>Order Total</Text>
                <Text className='font-extrabold'>
                    <Currency quantity={basketTotal+ 1250 }  currency="NGN" />
                </Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} className='rounded-lg bg-[#00ccbb] p-4'>
                <Text className='text-center text-white text-lg'>Place Order</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen