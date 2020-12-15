import React, {useReducer, useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar, ActivityIndicator, Button} from 'react-native';
import ListItem from './ListItem';
import axios from 'axios';
import { UsersContext } from '../App';

const HomeScreen = ({ navigation }) => {
  const usersContext = useContext(UsersContext);

  const addNewUser = () => {
    console.log('do modal');
    navigation.navigate('AddUser');
  }

  React.useLayoutEffect(()=> {
    navigation.setOptions({
      headerRight: () => (
      <View style={styles.headerRight}>
         <Button onPress={() => addNewUser()} title= 'Add' />
      </View>
       
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const pageNum = usersContext.usersState.page;
    const apiURL = 'https://reqres.in/api/users?page=' + pageNum;
    console.log('------- use effect, with pagenum [' + pageNum + ']');

    axios
      .get(apiURL)
      .then(res =>{
        const resData = res.data;
        usersContext.usersDispatch({type: 'FETCH_SUCCESS', payload: resData.data, total: resData.total_pages})
      })
      .catch(error => {
        usersContext.usersDispatch({type: 'FETCH_ERROR', payload: res.data, total: 0})
      })
  }, [usersContext.usersState.page]);

  const viewDetails = (item) => {
    console.log('view details ' + item.email);
    navigation.navigate('Details', {item: item});
  };

  const renderItem = ({item}) => {
    return <ListItem item={item} onPress={viewDetails}/>
  }

  const handleLoadMore = () => {

    console.log('total pages = ' + usersContext.usersState.total);

    if(!usersContext.usersState.loading && 
      (usersContext.usersState.page < usersContext.usersState.total)) {
      usersContext.usersDispatch({type: 'NEXT_PAGE'})
    }
  }

  const renderFooter = () => {
    if(usersContext.usersState.loading) {
      return (<View style={styles.loader}><ActivityIndicator size='large'/></View>);
    } 
    else {
      return null;
    }
  }

  return (
    <View>
      {/* <Text>{'users length = ' + usersContext.usersState.users.length}</Text> */}
      <FlatList
          data = {usersContext.usersState.users}
          renderItem = {renderItem}
          keyExtractor = {(item, index) => index.toString()}
          ListFooterComponent = { renderFooter}
          onEndReached = { handleLoadMore }
          onEndReachedThreshold = {0}
        /> 

    </View>

  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'papayawhip',
    marginTop: StatusBar.currentHeight || 0,
  },
  bodyArea:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    // height: 100,
  },
  bodyText: {
    // color: 'white'    
  },
  loader: {
    marginTop: 20,
  },
  headerRight: {
    paddingRight: 8,
  },
})