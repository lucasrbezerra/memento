import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

export const AddButton = (props) => {
  const { onPress, size } = props;
  
  return (
      <TouchableHighlight  underlayColor="#6B5362" onPress={onPress} style={styles.button}>
        <Icon name="plus" size={size} color="#FFF"/>
      </TouchableHighlight>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#543846",
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    bottom: 0,
    alignSelf: 'center',
    borderRadius: 20,
    marginVertical: 10 ,
    position: 'absolute',
    elevation: 5,
  },
});
