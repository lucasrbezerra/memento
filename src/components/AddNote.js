import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

export const AddNote = (props) => {
  const { onPress, size } = props;
  
  return (
      <TouchableHighlight  underlayColor="#6B5362" onPress={onPress} style={styles.button}>
        <Icon name="plus" size={size} color="#CFC5B2"/>
      </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#543846",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#543846',
    width: 167,
    height: 49,
    bottom: 0,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 20,
    position: 'relative',
  },
});
