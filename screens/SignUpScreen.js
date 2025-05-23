import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabs from '../BottomTabs';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
  if (!name || !email || !password) {
    alert('Error: All fields are required.');
    return;
  }

  try {
    const existingUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const userExists = existingUsers.some(user => user.email === email);
    if (userExists) {
      alert('Error: User already exists!');
      return;
    }
    const newUser = { name, email, password };
    const updatedUsers = [...existingUsers, newUser];
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('Success: Account created. Please sign in.');
    navigation.navigate('SignIn');
  } catch (error) {
    alert('Error: Failed to save user.');
  }
};

const handleClear = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Sign up</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input}/>
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none"/>
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry/>
        </View>
        <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#aaa' }]} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

<Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
  Already have an account? Sign in!
</Text>
<BottomTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    fontSize: 16,
    paddingVertical: 5,
    textAlign: 'center',
  },
  inputWrapper: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
    margin: 20,
  },
  link: { 
    marginTop: 20, 
    color: 'blue', 
    textAlign: 'center',
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
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#63a1f2',
    borderRadius: 5,
    alignItems: 'center',
  },
    buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;