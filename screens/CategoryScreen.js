import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabs from '../BottomTabs';

const CategoryScreen = ({ navigation }) => {
  const isLoggedIn = useSelector(state => state.auth.loggedIn);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('Access Denied: Please sign in to access this section!');
      navigation.navigate('SignIn');
    } else {
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories: ', error);
      setIsLoading(false);
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Categories</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
          accessibilityLabel="Profile"
          activeOpacity={1}
        >
          <Ionicons name="person-circle-outline" size={50} color="#fff" />
        </TouchableOpacity>

      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#63a1f2" />
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() =>
                navigation.navigate('ProductListScreen', { category: item })
              }
              activeOpacity={0.6} // this is where it should go
            >
              <Text style={styles.categoryText}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
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
  categoryItem: {
  width: '80%',
  backgroundColor: '#f9f9f9',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingVertical: 16,
  marginBottom: 10,
},
  listContent: {
    padding: 10,
  },
  profileButton: {
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryItem: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 16,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
});

export default CategoryScreen;