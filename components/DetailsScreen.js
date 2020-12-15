import React, {useContext, useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import axios from 'axios';

import { UsersContext } from '../App';

const DetailsScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [isEdit, setIsEdit] = useState(false);
    const username = item.first_name + ' ' + item.last_name;

    useEffect(() => {
      console.log('DetailsScreen useEffect!!!');
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.headerRight}>
            <Button onPress={() => setIsEdit((e)=>!e)} title={isEdit ? 'Cancel' : 'Edit'} />
          </View>
        ),
      });
    }, [isEdit]);

    React.useLayoutEffect(()=> {
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.headerRight}>
            <Button onPress={() => setIsEdit((e)=>!e)} title={isEdit ? 'Cancel' : 'Edit'} />
          </View>
        ),
      });
      
    }, [navigation], setIsEdit);

    const usersContext = useContext(UsersContext);

    function UserDataView({label, value}) {
      return (
        <View>
          <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputValue}><Text style={styles.inputValueText}>{value}</Text></View>
        </View>
      );
    }

    function ReadView(props) {

      const deleteUser = () => {
        console.log('deleting user ' + item.email);
        const apiURL = 'https://reqres.in/api/users/' + item.id;
  
        axios
        .delete(apiURL)
        .then(res =>{
          const resData = res.data;
          usersContext.usersDispatch({type: 'DELETE_USER', id: item.id})
        })
        .catch(error => {
          usersContext.usersDispatch({type: 'FETCH_ERROR', payload: res.data, total: 0})
        })
  
        navigation.goBack();
      }

      return (  
        <View style={styles.container}>
          <View style={styles.itemDetails}>
            <UserDataView label='First Name' value={item.first_name}/>
            <UserDataView label='Last Name' value={item.last_name}/>
            <UserDataView label='Email' value={item.email}/>
            <UserDataView label='ID' value={item.id}/>
          </View>
          <Button style={styles.delete} title={"Delete"} onPress={()=> deleteUser()}/>
        <View style={{ height: 100}}/></View>
      );
    }

    function EditView() {
      const [name, setName] = useState('');
      const [job, setJob] = useState('');

      const updateUser = (id) => {
        if (!name.trim()) {
          alert('Please enter a valid name');
          return;
        }
  
        if (!job.trim()) {
          alert('Please enter a valid job');
          return;
        }
        
        const apiURL = 'https://reqres.in/api/users/' + item.id;

        axios
        .put(apiURL, 
        {
          name: name,
          job: job
        })
        .then(res =>{
          console.log('--- success 1 ---')
          const resData = res.data;
          usersContext.usersDispatch({type: 'UPDATE_USER', id: item.id})
          setIsEdit(false);
        })
        .catch(error => {
          console.log(error);
        })
      }

      return  (
        <View style={styles.container}>
          <View style={styles.itemDetails}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput style={styles.input} placeholder={username} onChangeText={  (val) => setName(val) }/>
            <Text style={styles.inputLabel}>Job</Text>
            <TextInput style={styles.input} placeholder= 'e.g Painter' onChangeText={  (val) => setJob(val) }/>
          </View>
          <Button style={styles.delete} title={"Update"} onPress={()=> updateUser(item.id)}/>
        <View style={{ height: 100}}/>
        </View>
      );
    }

    function displayView() {
      if (isEdit) {
          return <EditView/>
      } else {
        return <ReadView/>
      }
    }

    return (
      displayView()
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  itemDetails: {
    flex: 1,
    padding:16,
  },
  delete: {
  },
  inputLabel:{
    fontSize:17, 
    marginTop:20,
    fontWeight: 'bold'
  },
  inputValue:{
    height: 50,
    justifyContent: 'center'
  },
  inputValueText:{
    fontSize: 21,
    color: 'gray'
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'gainsboro',
    marginBottom: 10,
    fontSize: 21,
  },
  headerRight: {
    paddingRight: 8,
  }
})

export default DetailsScreen;