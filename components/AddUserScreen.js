import React, {useContext, useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import axios from 'axios';

import { UsersContext } from '../App';

const AddUserScreen = ({ route, navigation }) => {
    // const { presentNewUser } = route.params;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const usersContext = useContext(UsersContext);
    
    const addUser = () => {
      if (!name.trim()) {
        alert('Please enter a valid name');
        return;
      }

      if (!job.trim()) {
        alert('Please enter a valid job');
        return;
      }

      let emailname = name.replace(/\s+/g, '');
      console.log('emailname = ' + emailname.toLowerCase());

       axios
      .post('https://reqres.in/api/users', 
      {
        name: name,
        job: job
      })
      .then(res =>{
        console.log('--- success 1 ---')
        const resData = res.data;
        const user = {
            "id": resData.id,
            "email": emailname.toLowerCase() + '@gmail.com',
            "first_name": "Test",
            "last_name": resData.name,
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        }
        usersContext.usersDispatch({type: 'ADD_USER', payload: user})
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      })
    }

    return (
      <View style={styles.container}>
      <View style={styles.itemDetails}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput style={styles.input} placeholder='e.g. John Doe' onChangeText={  (val) => setName(val) }/>
        <Text style={styles.inputLabel} >Job</Text>
        <TextInput style={styles.input} placeholder='e.g. Painter' onChangeText={  (val) => setJob(val) }/>
      </View>
      <Button style={styles.button} title={"Done"} onPress={()=> addUser()}/>
    <View style={{ height: 100}}/></View>
      );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center'
    },
    itemDetails: {
      flex: 1,
      padding:24,
      // fontSize: 19
      // height:300,
      // justifyContent: "space-between",
      // backgroundColor: 'wheat'
    },
    button: {
      // height: 64
      // marginBottom: 60
      // padding: 100
    },
    inputLabel:{
      fontSize:17, 
      marginTop:20,
      fontWeight: 'bold'
    },
    input: {
      height: 50,
      borderBottomWidth: 1,
      borderColor: 'gainsboro',
      marginBottom: 10,
      fontSize: 21,
    }
  })

export default AddUserScreen;