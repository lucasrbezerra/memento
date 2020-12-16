import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const SaveButton = (props) => {
  const { onPress } = props;
  return (
      <TouchableHighlight  underlayColor="#6B5362" onPress={onPress} style={styles.button}>
        <Text style={styles.text}>Salvar</Text>
      </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#543846",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#543846',
    width: 331,
    height: 50,
    bottom: 0,
    marginTop: hp('18%'),
    marginBottom: 8,
    borderRadius: 20,
    position: 'relative',
  },
  text: {
      fontFamily: 'Nunito-Black',
      color: 'white',
      fontSize: 18,
  }
});
