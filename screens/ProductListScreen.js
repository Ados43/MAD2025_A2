import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Product Details</Text>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {/* <Image style={styles.image} source={{ uri: product.Image }}/> */}
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.addToCartButtonText}>Add to Shopping Cart</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back to Product List</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#cccccc',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize:   20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  image: {
    alignSelf: 'center',
    width: 200, 
    height: 200,     
    marginBottom: 10,
  },
  detailsContainer: {
    width: '100%', 
    alignItems: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center', 
  },
  addToCartButton: {
    backgroundColor: '#00cc00',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  addToCartButtonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#cccccc',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default ProductDetailScreen;

