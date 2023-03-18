import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ResturantScreen from './screens/ResturantScreen';
import { Provider } from 'react-redux';
import { Store } from './Store';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
  <Provider store={Store}>
  <TailwindProvider>
    <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Resturant" component={ResturantScreen} />
    <Stack.Screen name="Basket" component={BasketScreen} 
    options={{ presentation: 'modal', headerShown: false}}
    />
    <Stack.Screen name="PreparingOrderScreen" 
    component={PreparingOrderScreen}
    options={{ presentation: "fullScreenModal", headerShown: false }}
    />
    <Stack.Screen name="Delivery" 
    component={DeliveryScreen}
    options={{ presentation: "fullScreenModal", headerShown: false }}    
    />
    </Stack.Navigator>
  </TailwindProvider>
  </Provider>
</NavigationContainer>
  );
}


