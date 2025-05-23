import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../redux/cartSlice';
import { addOrder } from '../redux/ordersSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomTabs from '../BottomTabs';

const ShoppingCartScreen = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  if (!isLoggedIn) {
    alert('Access Denied: Please sign in to view your cart!');
    navigation.navigate('SignIn');
    return null;
  }

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => dispatch(decreaseQuantity(item.id))}
            style={[styles.controlButton, { backgroundColor: '#ff4d4d' }]}
          >
            <Ionicons name="remove-circle-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => dispatch(increaseQuantity(item.id))}
            style={[styles.controlButton, { backgroundColor: '#4CAF50' }]}
          >
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const order = {
      id: Date.now(),
      status: 'New',
      items: cartItems,
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    alert('Order placed successfully!');
    navigation.navigate('OrderScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>My Shopping Cart</Text>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
              accessibilityLabel="Profile"
              activeOpacity={1}
            >
              <Ionicons name="person-circle-outline" size={50} color="#fff" />
            </TouchableOpacity>
          </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your shopping cart is empty!!!</Text>
        </View>
      ) : (
        <>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Total Items</Text>
              <Text style={styles.summaryValue}>{totalItems}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Total Price</Text>
              <Text style={styles.summaryValue}>${totalPrice}</Text>
            </View>
          </View>

          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />

          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}
      <BottomTabs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
  flexDirection: 'row',
  backgroundColor: '#63a1f2',
  paddingVertical: 30,
  paddingHorizontal: 15,
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10,
  position: 'relative',
},

headerText: {
  position: 'absolute',
  left: 0,
  right: 0,
  textAlign: 'center',
  fontSize: 25,
  fontWeight: 'bold',
  color: '#ffffff',
},
  profileButton: {
    padding: 5,
  },
  profileIcon: {
    fontSize: 28,
    color: '#ffffff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: -100,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  summaryBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '40%',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    borderRadius: 4,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  checkoutButton: {
    marginRight: 15,
    marginBottom: 75,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#63a1f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ShoppingCartScreen;
