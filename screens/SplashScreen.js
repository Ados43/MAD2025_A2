import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useSelector } from 'react-redux';
import splashImage from '../splashScreen.png'; 

const SplashScreen = ({ navigation }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Fake Store App';
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (navigation && navigation.reset) {
        navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, loggedIn]);

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.splashImg} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImg: {
    width: '90%',
    height: '90%',
    position: 'absolute',
    zIndex: -1,
    resizeMode: 'contain',
  },
});

export default SplashScreen;