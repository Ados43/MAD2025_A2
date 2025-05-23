import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout, setUser as setUserAction } from '../redux/authSlice';  // Rename import here
import { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabs from '../BottomTabs';

const ProfileScreen = ({ navigation }) => {
  // Keep your React state setter as 'setUser'
  const [user, setUser] = useState({ userName: '', userEmail: '', password: '' });
  const [originalUser, setOriginalUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const sessionUser = await AsyncStorage.getItem('sessionUser');
      if (sessionUser) {
        const parsed = JSON.parse(sessionUser);
        setUser({
          userName: parsed.userName || '',
          userEmail: parsed.userEmail || '',
          password: parsed.password || '',
        });
        setOriginalUser(parsed);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const { userName, userEmail, password } = user;
    if (!userName || !userEmail || !password) {
      alert('Error: All fields are required!');
      return;
    }

    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('sessionUser', JSON.stringify(user));
      alert('Success: Profile updated!');
      setOriginalUser(user);
      dispatch(setUserAction(user));  // Use renamed Redux action here
    } catch (error) {
      alert('Error: Failed to update profile! ' + error.message);
    }
  };

  const handleCancel = () => {
    if (originalUser) {
      setUser({
        userName: originalUser.userName || '',
        userEmail: originalUser.userEmail || '',
        password: originalUser.password || '',
      });
    }
  };

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('sessionUser');
    dispatch(logout());
    navigation.replace('SignIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" style={styles.backIcon} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>My Profile</Text>
        <View style={{ width: 90 }} />
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={user.userName}
          onChangeText={(text) => setUser({ ...user, userName: text })}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={user.userEmail}
          onChangeText={(text) => setUser({ ...user, userEmail: text })}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
          placeholder="Password"
          secureTextEntry
        />

        <View style={styles.inlineButtons}>
          <TouchableOpacity style={styles.smallButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smallButton, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

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
  },
  headerText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
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
  form: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  inlineButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  smallButton: {
    backgroundColor: '#63a1f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: 'crimson',
    padding: 12,
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
