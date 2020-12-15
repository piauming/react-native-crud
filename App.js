import 'react-native-gesture-handler';
import React, {useReducer, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text, StyleSheet, Button, FlatList, SafeAreaView, StatusBar, ActivityIndicator} from 'react-native';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import AddUserScreen from './components/AddUserScreen';

export const UsersContext = React.createContext();

const initialState = {
  loading: true,
  users: [],
  page: 1,
  total: 0,
  error: '',
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_SUCCESS':
      console.log('success!!!');
      return {
        loading: false,
        users: [...state.users, ...action.payload],
        page: state.page,
        total: action.total,
        error: '',
      };
    case 'UPDATE_USER':
        console.log('reducer update user with id = ' + action.id);
        return {
          loading: false,
          users: state.users,
          page: state.page,
          total: state.total,
          error: '',
        };
    case 'DELETE_USER':
      console.log('reducer delete user with id = ' + action.id);
      return {
        loading: false,
        users: [...state.users.filter(item => item.id != action.id)],
        page: state.page,
        total: state.total,
        error: '',
      };
    case 'ADD_USER':
      console.log('reducer add user with id = ' + action.payload);
      return {
        loading: false,
        users: [action.payload, ...state.users],
        page: state.page,
        total: state.total,
        error: '',
      };
    case 'NEXT_PAGE':
      console.log('next page!!!');
      return {
        loading: true,
        users: state.users,
        page: state.page + 1,
        total: state.total,
        error: '',
      };
    case 'FETCH_ERROR':
      return {
        loading: false,
        users: [],
        page: state.page,
        total: state.total,
        error: 'Something went wrong!',
      }
    default:
      return state;
  }
}

const App = () => {
  const [users, dispatch] = useReducer(reducer, initialState);

  const Stack = createStackNavigator();
  const MainStack = createStackNavigator();
  const RootStack = createStackNavigator();

  function MainStackScreen() {
    return (
      <MainStack.Navigator initialRouteName="Foo">
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="Details" component={DetailsScreen} />
      </MainStack.Navigator>
    );
  }

  return (
    <UsersContext.Provider value={{ usersState: users, usersDispatch: dispatch }}>
      <NavigationContainer> 
        <Stack.Navigator initialRouteName="Foo">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="AddUser" component={AddUserScreen} options={{ title: 'Add User' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UsersContext.Provider>
  );

  // return (

  //     <UsersContext.Provider value={{ usersState: users, usersDispatch: dispatch }}>
  //     <NavigationContainer>
  //       <RootStack.Navigator mode="modal" headerMode="none">
  //         <RootStack.Screen name="Main" component={MainStackScreen} />
  //         <RootStack.Screen name="AddUserScreen" component={AddUserScreen} />
  //       </RootStack.Navigator>
  //     </NavigationContainer>
  //     </UsersContext.Provider>
  // );
}

export default App;

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 8,
    // backgroundColor: 'blue'
  }

})