import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import BottomTabs from '../BottomTabs';
import { updateOrderStatus } from '../redux/ordersSlice'; 
import { useMemo } from 'react';

const OrderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const orders = useSelector((state) => state.orders.orders || []);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [loadingOrderIds, setLoadingOrderIds] = useState({});

  if (!isLoggedIn) {
    alert('Access Denied: Please sign in to access this section!');
    navigation.navigate('SignIn');
  }

const categorizedOrders = useMemo(() => {
  return {
    new: orders.filter((o) => o.status === 'new'),
    paid: orders.filter((o) => o.status === 'paid'),
    delivered: orders.filter((o) => o.status === 'delivered'),
  };
}, [orders]);

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setLoadingOrderIds((prev) => ({ ...prev, [orderId]: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(updateOrderStatus({ orderId, status: newStatus }));
      alert(`Success! Order ${orderId} marked as ${newStatus}!`);
    } catch (error) {
      alert('Error: Failed to update order status!');
    } finally {
      setLoadingOrderIds((prev) => ({ ...prev, [orderId]: false }));
    }
  };

const renderOrder = ({ item }) => {
  let normalizedItem = item;
  const cartItems = normalizedItem.items[2];

  if (Array.isArray(item) && item.length === 3) {
    normalizedItem = {
      id: item[0],
      status: item[1].toLowerCase(),
      items: item[2],
    };
  };
  const isExpanded = expandedOrders?.[normalizedItem.id] ?? false;
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.orderContainer}>
      <TouchableOpacity
        style={styles.orderHeader}
        onPress={() => toggleExpand(normalizedItem.id)}
      >
        <Ionicons
          name={isExpanded ? 'chevron-down' : 'chevron-forward'}
          size={20}
        />
        <Text style={styles.orderText}>Order ID: {normalizedItem.id}</Text>
        <Text style={styles.orderText}>Items: {itemCount}</Text>
        <Text style={styles.orderText}>Total: ${total}</Text>
        <Text style={[styles.statusText, styles[`status_${normalizedItem.status}`]]}>
          {normalizedItem.status.toUpperCase()}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.orderDetails}>
          {cartItems?.map((product, index) => (
            <View key={`${product.id}-${index}`} style={styles.productRow}>
              <Image source={{ uri: product.image }} style={styles.image} />
              <View style={styles.productInfo}>
                <Text numberOfLines={1} style={{ fontWeight: '600' }}>{product.title}</Text>
                <Text>Qty: {product.quantity}</Text>
              </View>
            </View>
          ))}

          {normalizedItem.status === 'new' && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => handleStatusUpdate(normalizedItem.id, 'paid')}
              disabled={loadingOrderIds[normalizedItem.id]}
            >
              {loadingOrderIds[normalizedItem.id] ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.actionButtonText}>Pay</Text>
              )}
            </TouchableOpacity>
          )}

          {normalizedItem.status === 'paid' && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
              onPress={() => handleStatusUpdate(normalizedItem.id, 'delivered')}
              disabled={loadingOrderIds[normalizedItem.id]}
            >
              {loadingOrderIds[normalizedItem.id] ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.actionButtonText}>Receive</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

  const renderCategory = (status, label) => {
    const list = categorizedOrders[status];
    if (!list || list.length === 0) return null;

    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryHeader}>{label}</Text>
        <FlatList data={list.map((raw) => {
        if (Array.isArray(raw) && raw.length === 3) {
          return {
            id: raw[0],
            status: raw[1],
            items: raw[2],
          };
        }
        return raw;
        })} keyExtractor={(item) => item.id.toString()} renderItem={renderOrder} scrollEnabled={false}/>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Orders</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
          accessibilityLabel="Profile"
        >
          <Ionicons name="person-circle-outline" size={50} color="#fff" />
        </TouchableOpacity>
      </View>

      {orders.length === 0 ? (
        <View style={{ padding: 20 }}>
          <Text style={styles.emptyText}>
            Your orders list is empty! Please place an order to see it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={['new', 'paid', 'delivered']}
          keyExtractor={(item) => item}
          renderItem={({ item }) =>
            renderCategory(
              item,
              item.charAt(0).toUpperCase() + item.slice(1) + ' Orders'
            )
          }
          ListFooterComponent={<View style={{ height: 80 }} />}
        />
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
  emptyText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: 200,
  },
  categoryContainer: {
    marginHorizontal: 16,
    marginBottom: 15,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  orderContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 14,
    flex: 1,
    marginHorizontal: 4,
  },
  statusText: {
    fontWeight: '700',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
    textAlign: 'center',
  },
  status_new: {
    backgroundColor: '#ffeb3b',
    color: '#333',
  },
  status_paid: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  status_delivered: {
    backgroundColor: '#2196f3',
    color: '#fff',
  },
  orderDetails: {
    marginTop: 10,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  actionButton: {
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default OrderScreen;
