import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AddContactScreen from './screens/AddContactScreen';
import ViewContactScreen from './screens/ViewContactScreen';
import EditContactScreen from './screens/EditContactScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: '#b83227',
        },
        headerTitleStyle: {
          color: '#fff',
        },
      }}>

        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Contact' }} />
        <Stack.Screen name="AddContact" component={AddContactScreen} options={{ title: 'Add New Contact' }} />
        <Stack.Screen name="ViewContact" component={ViewContactScreen} options={{ title: 'View Contact' }} />
        <Stack.Screen name="EditContact" component={EditContactScreen} options={{ title: 'Edit Contact' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
