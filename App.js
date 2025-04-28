import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from './screens/SplashScreen';
import CategoryScreen from './screens/CategoryScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'ios-home';
          } else if (route.name === 'Shopping Cart') {
            iconName = 'ios-cart';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarBadge: route.name === 'Shopping Cart' && totalItems > 0 ? totalItems : undefined,
      })}
    >
      <Tab.Screen name="Home" component={CategoryScreen} />
      <Tab.Screen name="Shopping Cart" component={ShoppingCartScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Main" component={HomeTabs} />
          <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
          <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
