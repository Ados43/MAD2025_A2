import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/cartSlice';

const ShoppingCartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.title}</Text>
      <Text>Price: ${item.price}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item.id))}>
          <Text style={styles.controlButton}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(increaseQuantity(item.id))}>
          <Text style={styles.controlButton}>+</Text>
        </TouchableOpacity>
        {item.quantity === 0 && (
          <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
            <Text style={styles.removeButton}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text>Your shopping cart is empty</Text>
      ) : (
        <>
          <Text>Total Items: {totalItems}</Text>
          <Text>Total Price: ${totalPrice.toFixed(2)}</Text>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    fontSize: 20,
    padding: 8,
    marginHorizontal: 4,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  removeButton: {
    color: 'red',
    marginLeft: 16,
  },
});

export default ShoppingCartScreen;
