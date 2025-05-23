import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const BottomTabs = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <View style={styles.container}>
      <TabButton label="Home" icon="pricetags-outline" onPress={() => navigation.navigate('CategoryScreen')} />
      <TabButton label="My Cart" icon="cart-outline" onPress={() => navigation.navigate('ShoppingCartScreen')} badgeCount={cartItems}/>
      <TabButton label="My Orders" icon="list-outline" onPress={() => navigation.navigate('OrderScreen')} />
    </View>
  );
};

const TabButton = ({ label, icon, onPress, badgeCount }) => (
  <TouchableOpacity style={styles.tab} onPress={onPress}>
    <View>
      <Ionicons name={icon} size={24} color="#333" />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </View>
    <Text>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});


export default BottomTabs;
