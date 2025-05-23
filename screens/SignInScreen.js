import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../redux/authSlice';
import BottomTabs from '../BottomTabs';


const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Error: All fields are required.');
      return;
    };
  try {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = JSON.parse(storedUsers) || [];
    const matchedUser = users.find(user => user.email === email && user.password === password);
    
    if (matchedUser) {
      await AsyncStorage.setItem('token', 'dummy-auth-token');
      await AsyncStorage.setItem('sessionUser', JSON.stringify(matchedUser));
      dispatch(setLoggedIn(true));
      navigation.navigate('CategoryScreen');
      alert('Sign in successful!');
    } else {
      alert('Error: Invalid credentials!');
    }
  } catch (error) {
    alert('Error: Sign in failed!');
  };
};

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign in</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} value={email} />
          <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword} value={password} />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>Don't have an account? Sign Up</Text>
      </View>
      <BottomTabs />
    </View>
  );

};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    fontSize: 15,
    paddingVertical: 5,
    textAlign: 'center',
  },
  inputWrapper: {
    alignSelf: 'center',
  },
  link: { 
    marginTop: 20, 
    color: 'blue', 
    textAlign: 'center',
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
    margin: 20,
  },
  header: {
    backgroundColor: '#63a1f2',
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignSelf: 'center',  
    width: '20%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#63a1f2',
    borderRadius: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default SignInScreen;