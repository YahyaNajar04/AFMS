import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import asyncStorageServices from '../components/asyncStorageServices'
import { client } from '../components/KindeConfig'
import { useRouter } from 'expo-router'
import { Image } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native'

export default function Profile() {

  const [user, setUser] = useState();

  useEffect(() => {
    getUserData();
  }, [])

  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  }
  const router = useRouter();


  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await asyncStorageServices.storeData('login', 'false');
      router.replace('/login');
      // User was logged out
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.logout}>

        <Text style={{

          fontSize: 30,
          color: 'black',
          marginLeft: 10,

        }}>
          Profile
        </Text>
        <View style={{
          width: 100,
          marginTop: 10,
          marginLeft: 270,
        }}>
          <TouchableOpacity onPress={handleLogout} >

            <Ionicons name="exit-outline" size={24} color="black" />

          </TouchableOpacity>
        </View>
      </View>
      <Image source={{ uri: user?.picture 
      }} style={styles.profile_Image}
      />
      <TouchableOpacity onPress={() => router.push('/editprofile')}>
      <Text style={styles.Text}>
      {user.given_name} {user.family_name}
      <Ionicons name="pencil" size={18} color="black" />
      </Text>
      </TouchableOpacity>
      
      <View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',

  },
  profile_Image: {
    width: 125,
    height: 125,
    borderRadius: 99,
    alignSelf: 'center',
    marginTop: 50,
  },
  logout: {
    marginTop: 10,
    alignSelf: 'left',
    width: '100%',
    length: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  Text: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  }
});