import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';

// const ListItem = (props) => {
    // props.item.text


  function UserDataView({value}) {
    return (
      <View style={styles.inputLabel}>
        <Text style={styles.inputText}>{value}</Text>
      </View>
    );
  }

const ListItem = ({item, onPress}) => {
    return (
        <TouchableOpacity style={styles.listItem} onPress={()=>onPress(item)}>
            <View style={styles.listItemView}>
                {/* <Text style={styles.listItemText}>{item.id + ". " + item.email}</Text>                 */}
                <UserDataView value={item.id + '. ' + item.first_name + ' ' + item.last_name}/>
                <UserDataView value={item.email}/>
            </View>
        </TouchableOpacity>
    );
}
  
ListItem.defaultProps = {
    title: "Title"
}

const styles = StyleSheet.create({
listItem: {
    // flex: 1, 
    // height: 64,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
      height: 240,
       justifyContent: 'center',
       paddingHorizontal: 16,
      //  flexDirection: 'row',
      //  justifyContent: 'space-between',
      //  alignItems: 'center',
    //    backgroundColor: ''

  },
  listItemDelete:{
    fontSize: 18,
    // color: 'red',
  },
  listItemText: {
    //   color: '#fff',
      fontSize: 19,
  },
  inputLabel: {
    padding: 8

  },
  inputText: {
    fontSize: 19

  }

})

export default ListItem;