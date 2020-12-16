import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

export const DeleteButton = (props) => {
  const { onPress } = props;
  
  return (
      <View style={styles.container}>
        <TouchableHighlight underlayColor="#D3E2E5" onPress={onPress} style={styles.button}>
            <Icon name="close" size={20} color="#FF669D"/>
        </TouchableHighlight>
      </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: "#D3E2E5",
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    bottom: 0,
    borderRadius: 8,
    marginRight: 8,
  },
  container: {
    backgroundColor: '#F5F8FA', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight: 16,
    marginLeft: -2,
    marginBottom: 3,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  }
});
