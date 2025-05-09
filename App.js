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

const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="CategoryScreen" component={CategoryScreen} />
      <HomeStack.Screen name="ProductListScreen" component={ProductListScreen} />
      <HomeStack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
    </HomeStack.Navigator>
  );
};

const HomeTabs = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Shopping Cart') {
            iconName = 'cart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarBadge: route.name === 'Shopping Cart' && totalItems > 0 ? totalItems : undefined,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Shopping Cart" component={ShoppingCartScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="SplashScreen" component={SplashScreen} />
          <RootStack.Screen name="Main" component={HomeTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
