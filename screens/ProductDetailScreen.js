import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import BottomTabs from '../BottomTabs';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={18} color="#fff" style={styles.backIcon} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Details</Text>
        <View style={{width: 90 }} />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Image style={styles.image} source={{ uri: product.image }} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>Price: ${product.price}</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>Description:</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => dispatch(addToCart(product))}
          >
            <Text style={styles.addToCartButtonText}>Add to Shopping Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#63a1f2',
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderColor: '#ddd',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 6,
  },
  backIcon: {
    marginRight: 2,
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  detailsContainer: {
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    color: '#000'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  descriptionBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
    width: '100%',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#63a1f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  addToCartButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  button: {
    backgroundColor: '#cccccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default ProductDetailScreen;
